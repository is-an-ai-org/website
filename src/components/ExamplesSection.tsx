import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ExampleCard from "./ExampleCard";

const PREDEFINED_EXAMPLES = [
  {
    subdomain: "beautyclip.is-an.ai",
    description: "AI-powered cosmetic search engine",
  },
  {
    subdomain: "trax.is-an.ai",
    description: "Just like Figma, but for musicians",
  },
  {
    subdomain: "seo.is-an.ai",
    description: "Developer Seo's portfolio",
  },
  {
    subdomain: "chungjung.is-an.ai",
    description: "Chungjung's personal blog",
  },
];

const ExamplesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-bp-bg border-b-[1.5px] border-bp-ink">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <span className="bp-tape">SHEET A-105 · GALLERY</span>
          <h2 className="font-script font-bold text-bp-ink leading-none mt-5 text-3xl sm:text-4xl">
            {t("examples.title")}
          </h2>
          <p className="text-bp-inkSoft mt-3 text-base">
            {t("examples.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {PREDEFINED_EXAMPLES.map((example) => (
            <ExampleCard
              key={example.subdomain}
              subdomain={example.subdomain}
              description={example.description}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/examples"
            className="text-bp-ink hover:text-bp-accent text-base"
          >
            {t("examples.viewAll")} →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;
