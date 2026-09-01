import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BlueprintCard } from "./blueprint";

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      part: "02",
      title: t("howItWorks.step1Title"),
      description: t("howItWorks.step1Desc"),
      details: t("howItWorks.step1Details"),
      glyph: "↗",
    },
    {
      part: "03",
      title: t("howItWorks.step2Title"),
      description: t("howItWorks.step2Desc"),
      details: t("howItWorks.step2Details"),
      glyph: "⌥",
    },
    {
      part: "04",
      title: t("howItWorks.step3Title"),
      description: t("howItWorks.step3Desc"),
      details: t("howItWorks.step3Details"),
      glyph: "▶",
    },
  ];

  return (
    <section className="relative bg-bp-paper bp-paper border-y-[1.5px] border-bp-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="bp-tape">SHEET A-104 · ASSEMBLY STEPS</span>
          <h2 className="font-script font-bold text-bp-ink leading-none mt-6 text-4xl sm:text-5xl lg:text-6xl">
            {t("howItWorks.title")}
          </h2>
          <p className="text-bp-inkSoft text-lg mt-4 max-w-2xl mx-auto">
            {t("howItWorks.description")}
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.part}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BlueprintCard className="p-6 sm:p-7">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-tape text-bp-inkSoft">
                    PART №{step.part}
                  </span>
                  <span className="text-2xl text-bp-accent leading-none">
                    {step.glyph}
                  </span>
                </div>

                <h3 className="font-script font-bold text-bp-ink text-3xl leading-none mb-3">
                  {step.title}
                </h3>
                <p className="text-bp-ink text-base mb-4 leading-snug">
                  {step.description}
                </p>
                <div className="border-t border-dashed border-bp-ink/40 pt-3">
                  <p className="font-mono text-[11px] text-bp-inkSoft leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </BlueprintCard>

              {/* Hand-drawn arrow between steps (desktop) */}
              {index < steps.length - 1 && (
                <svg
                  className="hidden lg:block absolute top-1/2 -right-6 w-12 h-6 -translate-y-1/2 z-[2] pointer-events-none"
                  viewBox="0 0 48 24"
                  aria-hidden
                >
                  <path
                    d="M 0 12 Q 24 10 44 12"
                    stroke="var(--bp-accent)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="4 3"
                  />
                  <path
                    d="M 40 8 L 46 12 L 40 16"
                    stroke="var(--bp-accent)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
