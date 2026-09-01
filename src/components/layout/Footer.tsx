import { useTranslation } from "react-i18next";
import { GITHUB_REPOSITORY_URL, DOMAIN_SUFFIX } from "@/lib/constants";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t-[1.5px] border-bp-ink bg-bp-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h3 className="font-bold text-bp-ink text-xl">is-an.ai</h3>
            <p className="text-bp-inkSoft text-sm mt-1 max-w-md leading-snug">
              {t("footer.tagline", { domain: DOMAIN_SUFFIX })}
              {""}
              <a
                href={GITHUB_REPOSITORY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-bp-accent decoration-2 underline-offset-2 hover:text-bp-accent"
              >
                {t("footer.contributeGithub")}
              </a>
            </p>
          </div>

          <span className="bp-tag self-start md:self-end">
            ✓ MIT · OPEN SOURCE
          </span>
        </div>

        <div className="mt-6 pt-4 border-t border-dashed border-bp-ink/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 font-mono text-[11px] text-bp-inkSoft tracking-[0.05em]">
          <p>{t("footer.openSource")}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:security@is-an.ai"
              className="underline hover:text-bp-accent"
              target="_blank"
            >
              {t("footer.reportAbuse")}
            </a>
            <p>
              {t("footer.inspiredBy")}
              {""}
              <a
                href="https://is-a.dev"
                className="underline hover:text-bp-accent"
                target="_blank"
              >
                is-a.dev
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
