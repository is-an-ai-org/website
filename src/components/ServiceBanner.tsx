import React from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

interface ServiceBannerProps {
  onClose?: () => void;
  isVisible?: boolean;
}

const ServiceBanner: React.FC<ServiceBannerProps> = ({
  onClose,
  isVisible = true,
}) => {
  const { t } = useTranslation();

  if (!isVisible) return null;

  return (
    <div className="bg-bp-paper border-b-[1.5px] border-bp-ink px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
          <span className="font-mono text-[10px] tracking-tape text-bp-accent2 border border-bp-accent2 px-1.5 py-0.5 mt-0.5 sm:mt-0 flex-shrink-0">
            ✓ NOTE
          </span>
          <div className="text-sm text-bp-ink min-w-0 flex-1 leading-snug">
            <span className="font-bold">{t("serviceBanner.title")}</span>
            <span className="ml-1 block sm:inline text-bp-inkSoft">
              — {t("serviceBanner.message")}
            </span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-bp-inkSoft hover:text-bp-accent transition-colors flex-shrink-0"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceBanner;
