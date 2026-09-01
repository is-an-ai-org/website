import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";
import { PlatformGuidance } from "@/lib/platformDetection";
import { PSL_WARNINGS } from "@/lib/pslWarnings";

interface PlatformGuidanceModalProps {
  guidance: PlatformGuidance;
  subdomainName: string;
  onViewDocs?: () => void;
}

const PlatformGuidanceModal = NiceModal.create<PlatformGuidanceModalProps>(
  ({ guidance, subdomainName, onViewDocs }) => {
    const modal = useModal();
    const { t } = useTranslation();

    const handleViewDocs = () => {
      onViewDocs?.();
      modal.remove();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 ${guidance.iconBg}  flex items-center justify-center mr-3`}
              >
                <span className="text-white text-xs font-bold">
                  {guidance.icon}
                </span>
              </div>
              <h3 className="text-lg font-bold text-bp-ink">
                {t("platformGuide.setupGuide", { platform: guidance.platform })}
              </h3>
            </div>
            <button
              onClick={() => modal.remove()}
              className="text-bp-inkFaint hover:text-bp-inkSoft transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div
              className={`${
                guidance.platform === "Vercel"
                  ? "bg-white/60 border border-bp-accent/60"
                  : "bg-white/60 border border-bp-accent/60"
              }  p-4`}
            >
              <div className="flex items-start">
                <svg
                  className={`w-5 h-5 ${
                    guidance.platform === "Vercel"
                      ? "text-bp-accent"
                      : "text-bp-accent"
                  } mr-2 mt-0.5 flex-shrink-0`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h4
                    className={`${
                      guidance.platform === "Vercel"
                        ? "text-bp-accent"
                        : "text-bp-ink"
                    } font-medium mb-1`}
                  >
                    {guidance.platform === "Vercel"
                      ? PSL_WARNINGS.UNSUPPORTED_PLATFORM
                      : PSL_WARNINGS.ADDITIONAL_SETUP_REQUIRED}
                  </h4>
                  <p
                    className={`${
                      guidance.platform === "Vercel"
                        ? "text-bp-accent"
                        : "text-bp-accent"
                    } text-sm`}
                  >
                    {guidance.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-bp-paper p-4">
              <h4 className="font-medium text-bp-ink mb-2">
                {t("platformGuide.nextSteps")}
              </h4>
              <ol className="space-y-2">
                {guidance.steps.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-bp-ink"
                  >
                    <span className="bg-gray-900 text-white w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
                <li className="flex items-start text-sm text-bp-ink">
                  <span className="bg-bp-accent2 text-white w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                    ✓
                  </span>
                  <span className="font-medium">
                    {t("platformGuide.enter", { name: subdomainName })}
                  </span>
                </li>
              </ol>
            </div>

            <div className="bg-white/60 border border-bp-ink/40 p-4">
              <p className="text-bp-ink text-sm">
                💡{" "}
                {t("platformGuide.dnsPropagation", {
                  platform: guidance.platform,
                })}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => modal.remove()}
                className="flex-1 px-4 py-2 border border-bp-ink/60 text-bp-ink hover:bg-bp-paper transition-colors text-sm font-medium"
              >
                {guidance.platform === "Vercel"
                  ? PSL_WARNINGS.CONFIRM
                  : PSL_WARNINGS.GOT_IT}
              </button>
              {onViewDocs && (
                <button
                  onClick={handleViewDocs}
                  className={`flex-1 px-4 py-2 ${
                    guidance.platform === "Vercel"
                      ? "bg-bp-accent hover:bg-bp-accent"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white  transition-colors text-sm font-medium`}
                >
                  {guidance.platform === "Vercel"
                    ? PSL_WARNINGS.VIEW_SUPPORTED_PLATFORMS
                    : PSL_WARNINGS.VIEW_DETAILED_GUIDE}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default PlatformGuidanceModal;
