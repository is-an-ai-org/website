import { useEffect } from "react";
import { TOAST_DURATION } from "@/lib/constants";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast = ({
  message,
  type = "success",
  isVisible,
  onClose,
  duration = TOAST_DURATION,
}: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const accent = {
    success: "var(--bp-accent-2)",
    error: "var(--bp-accent)",
    info: "var(--bp-ink)",
  }[type];

  const label = {
    success: "✓ OK",
    error: "✕ ERR",
    info: "ⓘ NOTE",
  }[type];

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div
        className="relative border-2 bg-bp-paper px-4 py-3 max-w-sm"
        style={{
          borderColor: accent,
          boxShadow: "4px 4px 0 var(--bp-ink)",
        }}
      >
        <div className="flex items-start gap-3">
          <span
            className="font-mono text-[10px] tracking-tape font-bold flex-shrink-0 mt-0.5"
            style={{ color: accent }}
          >
            {label}
          </span>
          <span className="text-bp-ink text-sm flex-1 leading-snug">
            {message}
          </span>
          <button
            onClick={onClose}
            className="text-bp-inkSoft hover:text-bp-accent flex-shrink-0"
            aria-label="Close"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
