import { useMemo } from "react";
import { useAllSubdomains } from "@/hooks/api/useSubdomains";
import { Subdomain } from "@/types/api";
import { DOMAIN_SUFFIX } from "@/lib/constants";
import { BugReportButton } from "@/components";
import { BlueprintCard } from "@/components/blueprint";

interface Project {
  id: string;
  name: string;
  subdomain: string;
  description: string;
  isLive: boolean;
}

const transformSubdomainToProject = (subdomain: Subdomain): Project => {
  return {
    id: subdomain.subdomainId,
    name: subdomain.subdomainName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(""),
    subdomain: `${subdomain.subdomainName}${DOMAIN_SUFFIX}`,
    description: subdomain.description,
    isLive: true,
  };
};

const ExamplesPage = () => {
  const {
    data: subdomains = [],
    isLoading,
    error,
    refetch,
  } = useAllSubdomains();

  const projects: Project[] = useMemo(
    () => subdomains.map(transformSubdomainToProject),
    [subdomains],
  );

  if (error) {
    return (
      <div className="min-h-screen bg-bp-bg bp-paper flex items-center justify-center px-4">
        <BlueprintCard
          className="p-6 text-center max-w-md"
          tone="accent"
          bg="bg-bp-paper"
          noSnapCorners
        >
          <span className="font-mono text-[10px] tracking-tape text-bp-accent border border-bp-accent px-2 py-0.5">
            ✕ ERROR
          </span>
          <h2 className="font-bold text-bp-ink text-2xl tracking-tight mt-3">
            Failed to load projects.
          </h2>
          <p className="text-bp-inkSoft text-sm mt-2">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="bp-btn bp-btn-accent font-bold mt-5"
            style={{ fontSize: 14 }}
          >
            try again →
          </button>
        </BlueprintCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bp-bg bp-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <span className="bp-tape">SHEET A-105 · GALLERY</span>
          <h1 className="font-script font-bold text-bp-ink leading-none mt-5 text-4xl sm:text-5xl">
            ai projects.
          </h1>
          <p className="text-bp-inkSoft mt-3 max-w-3xl mx-auto">
            AI projects using{" "}
            <span className="font-mono text-bp-ink">is-an.ai</span> subdomains
          </p>
        </div>

        {isLoading && (
          <div className="text-center py-12 text-bp-inkSoft">
            <span className="bp-cursor inline-block h-4 mr-1" />
            loading projects...
          </div>
        )}

        {!isLoading && (
          <div className="max-w-md mx-auto mb-12">
            <BlueprintCard className="p-5 text-center" noSnapCorners>
              <div className="font-mono text-[10px] tracking-tape text-bp-inkSoft">
                TOTAL · COUNT
              </div>
              <div className="font-script font-bold text-bp-ink text-5xl leading-none mt-1">
                {projects.length}
              </div>
              <div className="text-bp-inkSoft text-sm mt-1">
                projects shipped
              </div>
            </BlueprintCard>
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <BlueprintCard
                key={project.id}
                className="p-5 hover:bg-white transition-colors"
                noSnapCorners
              >
                <h3 className="font-bold text-bp-ink text-lg">
                  {project.name}
                </h3>
                <a
                  href={project.isLive ? `https://${project.subdomain}` : "#"}
                  target={project.isLive ? "_blank" : "_self"}
                  rel={project.isLive ? "noopener noreferrer" : ""}
                  className={`font-mono text-xs mt-1 inline-block ${
                    project.isLive
                      ? "text-bp-accent hover:underline"
                      : "text-bp-inkFaint cursor-not-allowed"
                  }`}
                >
                  {project.subdomain}
                  {project.isLive && " ↗"}
                </a>
                <p className="text-bp-ink text-sm mt-3 leading-snug">
                  {project.description}
                </p>
              </BlueprintCard>
            ))}
          </div>
        )}

        {!isLoading && projects.length === 0 && (
          <div className="text-center py-12">
            <div className="font-script text-3xl text-bp-ink">
              no projects yet.
            </div>
            <p className="text-bp-inkSoft text-sm mt-2">
              Be the first to register a subdomain!
            </p>
          </div>
        )}

        <div className="mt-16">
          <BlueprintCard
            className="p-8 text-center"
            bg="bg-bp-paper"
            noSnapCorners
          >
            <h2 className="font-script font-bold text-bp-ink text-3xl">
              want to add your AI project?
            </h2>
            <p className="text-bp-inkSoft mt-3 max-w-2xl mx-auto">
              Get your own subdomain and deploy your AI project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <a
                href="/"
                className="bp-btn bp-btn-accent font-bold"
                style={{ fontSize: 16 }}
              >
                register your subdomain →
              </a>
              <a
                href="/docs"
                className="bp-btn font-bold"
                style={{ fontSize: 16 }}
              >
                read documentation
              </a>
            </div>
          </BlueprintCard>
        </div>
      </div>

      <BugReportButton />
    </div>
  );
};

export default ExamplesPage;
