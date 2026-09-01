import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import { useAuth } from "@/hooks/api/useAuth";
import {
  useMySubdomains,
  useCreateSubdomain,
  useUpdateSubdomain,
  useDeleteSubdomain,
} from "@/hooks/api/useSubdomains";
import { useMyHostings, useDeleteHosting } from "@/hooks/api/useHosting";
import {
  CreateSubdomainModal,
  DeployHostingModal,
  EditSubdomainModal,
  BugReportButton,
} from "@/components";
import Toast from "@/components/Toast";
import {
  DOMAIN_SUFFIX,
  MAX_SUBDOMAINS_PER_USER,
  REGISTRAR_AT_CAPACITY,
} from "@/lib/constants";
import {
  Subdomain,
  CreateSubdomainRequest,
  UpdateSubdomainRequest,
  HostingStatus,
} from "@/types/api";
import { getErrorMessage } from "@/lib/validation";
import { BlueprintCard } from "@/components/blueprint";

const SectionCard = ({
  partNumber,
  title,
  subtitle,
  action,
  children,
}: {
  partNumber: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <BlueprintCard className="p-6 mb-8">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pb-4 border-b border-dashed border-bp-ink/40">
      <div>
        <span className="font-mono text-[10px] tracking-tape text-bp-inkSoft">
          PART №{partNumber}
        </span>
        <h2 className="font-script font-bold text-bp-ink text-3xl leading-none mt-1">
          {title}
        </h2>
        <p className="text-bp-inkSoft text-sm mt-1">{subtitle}</p>
      </div>
      {action}
    </div>
    {children}
  </BlueprintCard>
);

const ItemRow = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-dashed border-bp-ink/60 p-4 bg-white/50 hover:bg-white transition-colors">
    {children}
  </div>
);

const DashboardPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, isAuthenticated, logout, isLoading: authLoading } = useAuth();

  const { data: subdomains = [], isLoading, error } = useMySubdomains();
  const createMutation = useCreateSubdomain();
  const updateMutation = useUpdateSubdomain();
  const deleteMutation = useDeleteSubdomain();

  const { data: hostings = [], isLoading: hostingsLoading } = useMyHostings();
  const deleteHostingMutation = useDeleteHosting();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingSubdomain, setDeletingSubdomain] = useState<Subdomain | null>(
    null,
  );
  const [showDeleteHostingConfirm, setShowDeleteHostingConfirm] =
    useState(false);
  const [deletingHosting, setDeletingHosting] = useState<HostingStatus | null>(
    null,
  );
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({ message: "", type: "success", isVisible: false });

  if (!authLoading && !isAuthenticated) {
    navigate("/");
    return null;
  }

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const hasReachedLimit = subdomains.length >= MAX_SUBDOMAINS_PER_USER;
  const registrarAtCapacity = REGISTRAR_AT_CAPACITY === true;
  const isLegacyUser = subdomains.length > MAX_SUBDOMAINS_PER_USER;

  const handleCreateSubdomain = async (data: CreateSubdomainRequest) => {
    if (registrarAtCapacity) {
      showToast(t("dashboard.registrarUnavailable"), "error");
      return;
    }
    if (hasReachedLimit) {
      showToast(
        t("dashboard.maxSubdomains", { max: MAX_SUBDOMAINS_PER_USER }),
        "error",
      );
      return;
    }
    try {
      await createMutation.mutateAsync(data);
      showToast(t("dashboard.createdSuccess"));
    } catch (error) {
      showToast(getErrorMessage(error), "error");
      throw error;
    }
  };

  const handleUpdateSubdomain = async (
    data: UpdateSubdomainRequest,
    subdomainName: string,
  ) => {
    try {
      await updateMutation.mutateAsync({ name: subdomainName, data });
      showToast(t("dashboard.updatedSuccess"));
    } catch (error) {
      showToast(getErrorMessage(error), "error");
      throw error;
    }
  };

  const handleDeleteSubdomain = async () => {
    if (!deletingSubdomain) return;
    try {
      await deleteMutation.mutateAsync(deletingSubdomain.subdomainName);
      showToast(t("dashboard.deletedSuccess"));
      setShowDeleteConfirm(false);
      setDeletingSubdomain(null);
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    }
  };

  const handleCopySubdomain = async (subdomainName: string) => {
    try {
      await navigator.clipboard.writeText(`${subdomainName}${DOMAIN_SUFFIX}`);
      showToast(t("dashboard.copiedSuccess"));
    } catch {
      showToast(t("dashboard.copyFailed"), "error");
    }
  };

  const handleNavigateToDocs = (section?: string) => {
    const docsPath = section ? `/docs#${section}` : "/docs";
    navigate(docsPath);
  };

  const handleDeleteHosting = async () => {
    if (!deletingHosting) return;
    try {
      await deleteHostingMutation.mutateAsync(deletingHosting.subdomain);
      showToast("Hosted site deleted successfully");
      setShowDeleteHostingConfirm(false);
      setDeletingHosting(null);
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    }
  };

  const showDeployModal = () => {
    NiceModal.show(DeployHostingModal, {
      onSuccess: () => showToast("Site deployed successfully"),
    });
  };

  const showRedeployModal = (hosting: HostingStatus) => {
    NiceModal.show(DeployHostingModal, {
      onSuccess: () =>
        showToast(
          `${hosting.subdomain}${DOMAIN_SUFFIX} re-deployed successfully`,
        ),
    });
  };

  const showCreateModal = () => {
    if (hasReachedLimit) {
      showToast(
        t("dashboard.maxSubdomains", { max: MAX_SUBDOMAINS_PER_USER }),
        "error",
      );
      return;
    }
    if (registrarAtCapacity) {
      showToast(t("dashboard.registrarUnavailable"), "error");
      return;
    }
    NiceModal.show(CreateSubdomainModal, {
      onSubmit: handleCreateSubdomain,
      onNavigateToDocs: handleNavigateToDocs,
      isLoading: createMutation.isPending,
      error: createMutation.error?.message || null,
    });
  };

  const showEditModal = (subdomain: Subdomain) => {
    NiceModal.show(EditSubdomainModal, {
      onSubmit: (data: UpdateSubdomainRequest) =>
        handleUpdateSubdomain(data, subdomain.subdomainName),
      onNavigateToDocs: handleNavigateToDocs,
      subdomain,
      isLoading: updateMutation.isPending,
      error: updateMutation.error?.message || null,
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-bp-bg bp-paper flex items-center justify-center">
        <div className="text-center text-bp-ink">
          <span className="bp-cursor inline-block h-4 mr-1" />
          {t("dashboard.loading")}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bp-bg bp-paper">
      {/* Header */}
      <header className="bg-bp-paper border-b-[1.5px] border-bp-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-5 gap-3 sm:gap-0">
            <div>
              <span className="bp-tape">SHEET A-200 · DASHBOARD</span>
              <h1 className="font-script font-bold text-bp-ink text-3xl sm:text-4xl leading-none mt-3">
                {t("dashboard.title")}
              </h1>
              <p className="text-bp-inkSoft text-sm mt-1">
                {t("dashboard.welcomeBack", { name: user?.name })}
              </p>
            </div>
            <button
              onClick={logout}
              className="text-bp-inkSoft hover:text-bp-accent text-sm"
            >
              {t("dashboard.signOut")} ↗
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 border-2 border-bp-accent bg-bp-paper px-4 py-3">
            <span className="font-mono text-[10px] tracking-tape text-bp-accent border border-bp-accent px-1.5 py-0.5 mr-2">
              ✕ ERR
            </span>
            <span className="text-bp-ink text-sm">{error.message}</span>
          </div>
        )}

        {hasReachedLimit && (
          <div className="mb-6 border-2 border-bp-accent bg-bp-paper px-4 py-3">
            <span className="font-mono text-[10px] tracking-tape text-bp-accent border border-bp-accent px-1.5 py-0.5 mr-2">
              ⚠ NOTE
            </span>
            {isLegacyUser ? (
              <span className="text-bp-ink text-sm">
                <span className="font-bold">{t("dashboard.legacyNotice")}</span>
                {""}—{" "}
                {t("dashboard.legacyDesc", {
                  count: subdomains.length,
                  max: MAX_SUBDOMAINS_PER_USER,
                })}
              </span>
            ) : (
              <span className="text-bp-ink text-sm">
                {t("dashboard.limitReached", { max: MAX_SUBDOMAINS_PER_USER })}
              </span>
            )}
          </div>
        )}

        <SectionCard
          partNumber="01"
          title={t("dashboard.yourSubdomains")}
          subtitle={
            isLegacyUser
              ? t("dashboard.manageSubdomainsLegacy", {
                  count: subdomains.length,
                  max: MAX_SUBDOMAINS_PER_USER,
                })
              : t("dashboard.manageSubdomains", {
                  count: subdomains.length,
                  max: MAX_SUBDOMAINS_PER_USER,
                })
          }
          action={
            <button
              onClick={showCreateModal}
              disabled={hasReachedLimit || registrarAtCapacity}
              className="bp-btn bp-btn-accent font-bold"
              style={{ fontSize: 14 }}
              title={
                registrarAtCapacity
                  ? t("dashboard.registrarUnavailable")
                  : hasReachedLimit
                    ? t("dashboard.maxSubdomains", {
                        max: MAX_SUBDOMAINS_PER_USER,
                      })
                    : undefined
              }
            >
              + {t("dashboard.createSubdomain")}
            </button>
          }
        >
          {isLoading ? (
            <div className="text-center py-8 text-bp-inkSoft text-sm">
              <span className="bp-cursor inline-block h-3 mr-1" />
              {t("dashboard.loadingSubdomains")}
            </div>
          ) : subdomains.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-bp-inkSoft mb-3">
                {t("dashboard.noSubdomains")}
              </p>
              <button
                onClick={showCreateModal}
                disabled={registrarAtCapacity}
                className="text-bp-accent hover:underline text-sm font-bold disabled:text-bp-inkFaint"
              >
                → {t("dashboard.createFirst")}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {subdomains.map((subdomain: Subdomain) => (
                <ItemRow key={subdomain.subdomainId}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-bp-ink text-lg">
                          {subdomain.subdomainName}
                          <span className="text-bp-inkSoft">
                            {DOMAIN_SUFFIX}
                          </span>
                        </h3>
                        <button
                          onClick={() =>
                            handleCopySubdomain(subdomain.subdomainName)
                          }
                          className="text-bp-inkSoft hover:text-bp-accent"
                          title={t("dashboard.copyToClipboard")}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-bp-ink text-sm mb-1">
                        {subdomain.description}
                      </p>
                      <div className="font-mono text-[10px] tracking-[0.05em] text-bp-inkSoft">
                        {t("dashboard.created").toUpperCase()}
                        {""}
                        {new Date(subdomain.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => showEditModal(subdomain)}
                        className="text-bp-ink hover:text-bp-accent text-sm font-bold"
                      >
                        {t("dashboard.edit")}
                      </button>
                      <button
                        onClick={() => {
                          setDeletingSubdomain(subdomain);
                          setShowDeleteConfirm(true);
                        }}
                        className="text-bp-accent hover:underline text-sm font-bold"
                      >
                        {t("dashboard.delete")}
                      </button>
                    </div>
                  </div>
                </ItemRow>
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard
          partNumber="02"
          title="Hosted Sites"
          subtitle="Deploy and manage static sites on your subdomains"
          action={
            <button
              onClick={showDeployModal}
              className="bp-btn bp-btn-accent font-bold"
              style={{ fontSize: 14 }}
            >
              + Deploy new site
            </button>
          }
        >
          {hostingsLoading ? (
            <div className="text-center py-8 text-bp-inkSoft text-sm">
              <span className="bp-cursor inline-block h-3 mr-1" />
              Loading hosted sites...
            </div>
          ) : hostings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-bp-inkSoft mb-3">
                You haven't deployed any sites yet.
              </p>
              <button
                onClick={showDeployModal}
                className="text-bp-accent hover:underline text-sm font-bold"
              >
                → Deploy your first site
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {hostings.map((hosting: HostingStatus) => (
                <ItemRow key={hosting.subdomain}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-bp-ink text-lg mb-1">
                        {hosting.subdomain}
                        <span className="text-bp-inkSoft">{DOMAIN_SUFFIX}</span>
                      </h3>
                      <a
                        href={hosting.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-bp-accent hover:underline break-all"
                      >
                        {hosting.url}
                      </a>
                      <div className="flex flex-wrap items-center gap-3 mt-2 font-mono text-[10px] tracking-[0.05em] text-bp-inkSoft">
                        <span>{hosting.fileCount} FILES</span>
                        <span>
                          {hosting.totalSize < 1024 * 1024
                            ? `${(hosting.totalSize / 1024).toFixed(1)} KB`
                            : `${(hosting.totalSize / (1024 * 1024)).toFixed(1)} MB`}
                        </span>
                        <span>
                          DEPLOYED{""}
                          {new Date(
                            hosting.lastDeployedAt,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => showRedeployModal(hosting)}
                        className="text-bp-ink hover:text-bp-accent text-sm font-bold"
                      >
                        Re-deploy
                      </button>
                      <button
                        onClick={() => {
                          setDeletingHosting(hosting);
                          setShowDeleteHostingConfirm(true);
                        }}
                        className="text-bp-accent hover:underline text-sm font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </ItemRow>
              ))}
            </div>
          )}
        </SectionCard>
      </main>

      {/* Delete subdomain confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-bp-ink/30 flex items-center justify-center p-4 z-50">
          <BlueprintCard
            className="p-6 max-w-md w-full"
            tone="accent"
            bg="bg-bp-paper"
            noSnapCorners
          >
            <span className="font-mono text-[10px] tracking-tape text-bp-accent border border-bp-accent px-1.5 py-0.5">
              ✕ DELETE
            </span>
            <h3 className="font-bold text-bp-ink text-xl tracking-tight mt-3">
              {t("dashboard.deleteTitle")}
            </h3>
            <p className="text-bp-ink text-sm mt-3">
              <Trans
                i18nKey="dashboard.deleteConfirm"
                values={{
                  name: deletingSubdomain?.subdomainName,
                  domain: DOMAIN_SUFFIX,
                }}
                components={{
                  mono: <span className="font-mono font-bold text-bp-ink" />,
                }}
              />
            </p>
            <div className="flex gap-3 justify-end mt-5">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletingSubdomain(null);
                }}
                className="bp-btn"
                style={{ fontSize: 14 }}
                disabled={deleteMutation.isPending}
              >
                {t("dashboard.cancel")}
              </button>
              <button
                onClick={handleDeleteSubdomain}
                disabled={deleteMutation.isPending}
                className="bp-btn bp-btn-accent font-bold"
                style={{ fontSize: 14 }}
              >
                {deleteMutation.isPending
                  ? t("dashboard.deleting")
                  : t("dashboard.delete")}
              </button>
            </div>
          </BlueprintCard>
        </div>
      )}

      {/* Delete hosting confirmation */}
      {showDeleteHostingConfirm && (
        <div className="fixed inset-0 bg-bp-ink/30 flex items-center justify-center p-4 z-50">
          <BlueprintCard
            className="p-6 max-w-md w-full"
            tone="accent"
            bg="bg-bp-paper"
            noSnapCorners
          >
            <span className="font-mono text-[10px] tracking-tape text-bp-accent border border-bp-accent px-1.5 py-0.5">
              ✕ DELETE
            </span>
            <h3 className="font-bold text-bp-ink text-xl tracking-tight mt-3">
              Delete hosted site
            </h3>
            <p className="text-bp-ink text-sm mt-3">
              Are you sure you want to delete{" "}
              <span className="font-mono font-bold text-bp-ink">
                {deletingHosting?.subdomain}
                {DOMAIN_SUFFIX}
              </span>
              ? This will remove all hosted files and cannot be undone.
            </p>
            <div className="flex gap-3 justify-end mt-5">
              <button
                onClick={() => {
                  setShowDeleteHostingConfirm(false);
                  setDeletingHosting(null);
                }}
                className="bp-btn"
                style={{ fontSize: 14 }}
                disabled={deleteHostingMutation.isPending}
              >
                {t("dashboard.cancel")}
              </button>
              <button
                onClick={handleDeleteHosting}
                disabled={deleteHostingMutation.isPending}
                className="bp-btn bp-btn-accent font-bold"
                style={{ fontSize: 14 }}
              >
                {deleteHostingMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </BlueprintCard>
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <BugReportButton />
    </div>
  );
};

export default DashboardPage;
