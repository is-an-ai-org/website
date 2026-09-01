import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/api/useAuth";
import { useSubdomainAvailability } from "@/hooks/api/useSubdomains";
import TypingAnimation from "./TypingAnimation";
import { BlueprintCard } from "./blueprint";

interface SubdomainCheckerProps {
  onAvailabilityCheck?: (subdomain: string, isAvailable: boolean) => void;
}

const SAMPLE_NAMES = [
  "friday",
  "jarvis",
  "cortana",
  "ava",
  "samantha",
  "wall-e",
  "hal-9000",
  "data",
];

const SubdomainChecker = ({ onAvailabilityCheck }: SubdomainCheckerProps) => {
  const [subdomainInput, setSubdomainInput] = useState("");
  const [checkingName, setCheckingName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const { t } = useTranslation();

  const {
    data: availabilityResult,
    isLoading: isCheckingAvailability,
    error,
  } = useSubdomainAvailability(checkingName);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
        .toLowerCase()
        .replace(/[^\p{L}\p{N}-]/gu, "");
      setSubdomainInput(value);
      if (checkingName && checkingName !== value) {
        setCheckingName("");
      }
    },
    [checkingName],
  );

  const handleCheckAvailability = useCallback(() => {
    const trimmed = subdomainInput.trim().toLowerCase();
    if (!trimmed) return;
    setCheckingName(trimmed);
  }, [subdomainInput]);

  React.useEffect(() => {
    if (checkingName && availabilityResult !== undefined) {
      onAvailabilityCheck?.(checkingName, availabilityResult.available);
    }
  }, [checkingName, availabilityResult, onAvailabilityCheck]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleCheckAvailability();
      }
    },
    [handleCheckAvailability],
  );

  const hasChecked = !!checkingName && checkingName === subdomainInput.trim();

  const showTypingDemo = subdomainInput.length === 0 && !isFocused;

  // Status line
  let statusEl: React.ReactNode;
  if (error) {
    statusEl = (
      <span className="text-bp-accent">
        <span className="font-bold">● ERROR</span> —{" "}
        {t("checker.errorChecking")}
      </span>
    );
  } else if (isCheckingAvailability) {
    statusEl = (
      <span className="text-bp-inkSoft">
        <span className="font-bold animate-pulse">● CHECKING</span> —{""}
        {t("checker.checking")}
      </span>
    );
  } else if (hasChecked && availabilityResult?.available === true) {
    statusEl = (
      <span className="text-bp-accent2">
        <span className="font-bold">● AVAILABLE</span> — yours in 60s
      </span>
    );
  } else if (hasChecked && availabilityResult?.available === false) {
    statusEl = (
      <span className="text-bp-accent">
        <span className="font-bold">● TAKEN</span> —{""}
        {availabilityResult?.error ||
          t("checker.notAvailable", { name: subdomainInput })}
      </span>
    );
  } else {
    statusEl = (
      <span className="text-bp-inkSoft">
        <span className="font-bold">● READY</span> — type a name and hit claim
      </span>
    );
  }

  return (
    <div className="relative w-full max-w-[720px] mx-auto">
      {/* Small label above */}
      <div className="text-center mb-3 sm:mb-4">
        <div className="font-mono text-[10px] sm:text-[11px] text-bp-inkSoft tracking-tape">
          ── PART №01 · MAIN ASSEMBLY ──
        </div>
        <div className="font-script text-bp-ink font-bold leading-none mt-1.5 text-4xl sm:text-5xl">
          claim a subdomain.
        </div>
      </div>

      {/* Form card with double border + corner snap dots */}
      <BlueprintCard className="px-4 sm:px-8 py-6 sm:py-7" bg="bg-white/90">
        {/* input row */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-3.5 relative">
          <label
            className="relative flex-1 flex items-center bg-white border-2 border-bp-ink px-3 sm:px-4 py-3 sm:py-3.5 cursor-text"
            style={{ minHeight: 78 }}
          >
            <input
              type="text"
              value={subdomainInput}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyPress={handleKeyPress}
              maxLength={63}
              spellCheck={false}
              aria-label={t("checker.placeholder")}
              className="absolute inset-0 opacity-0 w-full h-full"
            />
            {/* visible value/placeholder */}
            <div className="flex items-center w-full overflow-hidden">
              <span
                className="font-hand font-bold text-bp-accent leading-none whitespace-nowrap"
                style={{
                  fontSize: "clamp(28px, 6vw, 48px)",
                  background: "rgba(217,84,42,0.1)",
                  padding: "0 8px",
                }}
              >
                {showTypingDemo ? (
                  <TypingAnimation
                    words={SAMPLE_NAMES}
                    cursorClassName="text-bp-accent"
                  />
                ) : (
                  subdomainInput || (
                    <span className="text-bp-inkFaint">your-name</span>
                  )
                )}
              </span>
              {!showTypingDemo && (
                <span
                  className="bp-cursor ml-0.5"
                  style={{ height: "1em" }}
                  aria-hidden
                />
              )}
              <span
                className="ml-auto font-hand font-bold text-bp-ink leading-none whitespace-nowrap pl-2"
                style={{ fontSize: "clamp(20px, 5vw, 48px)" }}
              >
                .is-an.ai
              </span>
            </div>
          </label>
          <button
            onClick={handleCheckAvailability}
            disabled={!subdomainInput.trim() || isCheckingAvailability}
            className="bp-btn bp-btn-accent font-bold whitespace-nowrap"
            style={{
              fontSize: 22,
              minHeight: 78,
              minWidth: 160,
              padding: "0 26px",
            }}
          >
            {isCheckingAvailability ? "···" : "claim →"}
          </button>
        </div>

        {/* status line */}
        <div className="mt-3 sm:mt-3.5 flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.1em]">
          <span>{statusEl}</span>
          <span className="text-bp-inkSoft">FREE · OPEN SOURCE · MIT</span>
        </div>
      </BlueprintCard>

      {/* Below form: secondary github CTA — only when not yet logged in */}
      {!isAuthenticated && (
        <div className="mt-5 sm:mt-6 text-center">
          <div className="text-bp-inkSoft text-sm">
            {t("checker.signInPrompt")} —
          </div>
          <button
            onClick={login}
            className="bp-btn bp-btn-graphite mt-2 font-bold"
            style={{ fontSize: 16 }}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.230.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            continue with github
          </button>
        </div>
      )}
    </div>
  );
};

export default SubdomainChecker;
