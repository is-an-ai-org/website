import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GITHUB_REPOSITORY_URL } from "@/lib/constants";
import { useAuth } from "@/hooks/api/useAuth";
import LanguageSwitcher from "../LanguageSwitcher";

const BPLogo = () => (
  <Link
    to="/"
    className="flex items-center gap-2.5 font-hand font-bold text-bp-ink"
  >
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      style={{ overflow: "visible" }}
      aria-hidden
    >
      <rect
        x="2"
        y="2"
        width="24"
        height="24"
        fill="none"
        stroke="var(--bp-ink)"
        strokeWidth="1.5"
      />
      <path
        d="M 2 14 L 26 14 M 14 2 L 14 26"
        stroke="var(--bp-ink-soft)"
        strokeWidth="0.75"
        strokeDasharray="2 2"
      />
      <text
        x="14"
        y="18"
        textAnchor="middle"
        fontFamily="Architects Daughter, cursive"
        fontSize="11"
        fill="var(--bp-ink)"
        fontWeight="700"
      >
        i.
      </text>
    </svg>
    <span className="text-[22px] leading-none">is-an.ai</span>
    <span className="font-mono text-[9px] tracking-[0.1em] text-bp-inkSoft border border-bp-ink px-1.5 py-0.5 ml-1">
      REV.05
    </span>
  </Link>
);

const navLinkClass =
  "text-bp-ink hover:text-bp-accent transition-colors text-[16px]";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const toggle = () => setIsMobileMenuOpen((v) => !v);
  const close = () => setIsMobileMenuOpen(false);

  return (
    <header className="border-b-[1.5px] border-bp-ink bg-bp-paper sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <BPLogo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated && (
              <Link to="/dashboard" className={navLinkClass}>
                {t("nav.dashboard")}
              </Link>
            )}
            <Link to="/docs" className={navLinkClass}>
              {t("nav.docs")}
            </Link>
            <Link to="/examples" className={navLinkClass}>
              {t("nav.examples")}
            </Link>
            <Link to="/blog" className={navLinkClass}>
              {t("nav.blog")}
            </Link>
            <a
              href={GITHUB_REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${navLinkClass} flex items-center gap-1`}
            >
              ↗ {t("nav.github")}
            </a>
            <LanguageSwitcher />
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={toggle}
              className="p-2 text-bp-ink hover:text-bp-accent transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-5 h-5"
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
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-bp-ink/50 bg-bp-paper">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  onClick={close}
                  className={`block px-3 py-2 ${navLinkClass}`}
                >
                  {t("nav.dashboard")}
                </Link>
              )}
              <Link
                to="/docs"
                onClick={close}
                className={`block px-3 py-2 ${navLinkClass}`}
              >
                {t("nav.docs")}
              </Link>
              <Link
                to="/examples"
                onClick={close}
                className={`block px-3 py-2 ${navLinkClass}`}
              >
                {t("nav.examples")}
              </Link>
              <Link
                to="/blog"
                onClick={close}
                className={`block px-3 py-2 ${navLinkClass}`}
              >
                {t("nav.blog")}
              </Link>
              <a
                href={GITHUB_REPOSITORY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className={`block px-3 py-2 ${navLinkClass}`}
              >
                ↗ {t("nav.github")}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
