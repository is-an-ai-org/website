import {
  Subdomain,
  CreateSubdomainRequest,
  UpdateSubdomainRequest,
  CreateSubdomainResponse,
  DeleteResponse,
  ApiError,
  SubdomainAvailabilityResponse,
  HostingResponse,
  HostingStatus,
} from "@/types/api";
import {
  API_BASE_URL,
  AUTH_TOKEN_KEY,
  API_ENDPOINTS,
  HTTP_STATUS,
} from "./constants";

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.loadToken();
  }

  private loadToken() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem(AUTH_TOKEN_KEY);
    }
  }

  private getToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  private clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    // Token can be written after this singleton is instantiated (e.g. auth callback)
    this.loadToken();

    const url = `${this.baseUrl}${endpoint}`;
    const method = (options.method ?? "GET").toUpperCase();

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available and not a public endpoint
    const token = this.getToken() ?? this.token;
    if (token && !this.isPublicEndpoint(endpoint, method)) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          code: response.status,
          message: response.statusText || "Unknown error",
        }));

        // Handle token expiration
        if (errorData.code === HTTP_STATUS.UNAUTHORIZED) {
          this.clearToken();
        }

        throw errorData;
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return {} as T;
    } catch (error) {
      if (error instanceof Error) {
        throw {
          code: 0,
          message: error.message,
        } as ApiError;
      }
      throw error;
    }
  }

  private isPublicEndpoint(endpoint: string, method: string): boolean {
    // Auth endpoints
    if (endpoint.startsWith("/v1/dev/")) {
      return true;
    }
    if (endpoint.startsWith("/v1/user/auth/")) {
      return true;
    }

    // Public domain read endpoints (⚠️ /v3/domain/my is NOT public)
    // Note: /v3/domain is public only for GET. POST requires auth.
    if (endpoint === API_ENDPOINTS.DOMAINS && method === "GET") {
      return true;
    }
    if (endpoint.startsWith("/v3/domain/id/") && method === "GET") {
      return true;
    }
    if (endpoint.startsWith("/v3/domain/name/") && method === "GET") {
      return true;
    }

    // Public availability endpoint (v3)
    if (endpoint.startsWith("/v2/domain/available/") && method === "GET") {
      return true;
    }

    return false;
  }

  logout() {
    this.clearToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Domain methods
  async getAllSubdomains(): Promise<Subdomain[]> {
    return this.request<Subdomain[]>(API_ENDPOINTS.DOMAINS);
  }

  async getMySubdomains(): Promise<Subdomain[]> {
    return this.request<Subdomain[]>(API_ENDPOINTS.MY_DOMAINS);
  }

  async getSubdomainById(id: string): Promise<Subdomain> {
    return this.request<Subdomain>(API_ENDPOINTS.DOMAIN_BY_ID(id));
  }

  async getSubdomainByName(name: string): Promise<Subdomain> {
    return this.request<Subdomain>(API_ENDPOINTS.DOMAIN_BY_NAME(name));
  }

  async checkSubdomainAvailability(
    name: string,
  ): Promise<SubdomainAvailabilityResponse> {
    return this.request<SubdomainAvailabilityResponse>(
      API_ENDPOINTS.DOMAIN_AVAILABILITY_V2(name),
    );
  }

  async createSubdomain(
    data: CreateSubdomainRequest,
  ): Promise<CreateSubdomainResponse> {
    return this.request<CreateSubdomainResponse>(API_ENDPOINTS.CREATE_DOMAIN, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateSubdomain(
    name: string,
    data: UpdateSubdomainRequest,
  ): Promise<CreateSubdomainResponse> {
    return this.request<CreateSubdomainResponse>(
      API_ENDPOINTS.UPDATE_DOMAIN(name),
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
    );
  }

  async deleteSubdomain(name: string): Promise<DeleteResponse> {
    return this.request<DeleteResponse>(API_ENDPOINTS.DELETE_DOMAIN(name), {
      method: "DELETE",
    });
  }

  // Hosting methods
  async deployHosting(
    name: string,
    files: FileList | File[],
  ): Promise<HostingResponse> {
    const fileArray = Array.from(files);
    const fileEntries = fileArray.map((file) => {
      const relativePath = file.webkitRelativePath;
      const path = relativePath
        ? relativePath.split("/").slice(1).join("/")
        : file.name;
      return {
        file,
        path,
        size: file.size,
        contentType: file.type || "application/octet-stream",
      };
    });

    // Step 1: Get presigned upload URLs
    const prepareResponse = await this.request<{
      uploadUrls: { path: string; url: string }[];
    }>(API_ENDPOINTS.HOSTING_PREPARE(name), {
      method: "POST",
      body: JSON.stringify({
        files: fileEntries.map((f) => ({
          path: f.path,
          size: f.size,
          contentType: f.contentType,
        })),
      }),
    });

    // Step 2: Upload files directly to S3
    const urlMap = new Map(
      prepareResponse.uploadUrls.map((u) => [u.path, u.url]),
    );
    await Promise.all(
      fileEntries.map(async (entry) => {
        const uploadUrl = urlMap.get(entry.path);
        if (!uploadUrl) throw new Error(`No upload URL for ${entry.path}`);
        const response = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": entry.contentType },
          body: entry.file,
        });
        if (!response.ok) {
          throw new Error(
            `Upload failed for ${entry.path}: ${response.status}`,
          );
        }
      }),
    );

    // Step 3: Confirm deployment
    return this.request<HostingResponse>(API_ENDPOINTS.HOSTING_CONFIRM(name), {
      method: "POST",
      body: JSON.stringify({
        files: fileEntries.map((f) => ({ path: f.path, size: f.size })),
      }),
    });
  }

  async getHosting(name: string): Promise<HostingStatus> {
    return this.request<HostingStatus>(API_ENDPOINTS.HOSTING_BY_NAME(name));
  }

  async deleteHosting(name: string): Promise<void> {
    return this.request<void>(API_ENDPOINTS.HOSTING_BY_NAME(name), {
      method: "DELETE",
    });
  }

  async getMyHostings(): Promise<HostingStatus[]> {
    return this.request<HostingStatus[]>(API_ENDPOINTS.MY_HOSTINGS);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
