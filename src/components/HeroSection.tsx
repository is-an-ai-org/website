import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SubdomainChecker from "./SubdomainChecker";
import {
  BPSticky,
  BPSSLStamp,
  BPGlobe,
  BPCoffeeRing,
  HeroArrows,
  TitleBlock,
} from "./blueprint";
import { useAuth } from "@/hooks/api/useAuth";

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  return (
    <section className="relative bp-paper border-y-[1.5px] border-bp-ink">
      {/* sheet header strip */}
      <div className="absolute top-5 left-0 right-0 z-[3] flex items-baseline justify-between px-4 sm:px-12 lg:px-16">
        <div className="bp-tape">SHEET A-103 · DIY ASSEMBLY KIT</div>
        <div className="hidden sm:block font-hand text-bp-inkSoft text-sm">
          some assembly required ✎
        </div>
      </div>

      {/* Decorative arrows — desktop only */}
      <div className="hidden lg:block absolute inset-0 z-[1] pointer-events-none">
        <HeroArrows />
      </div>

      {/* Page-level handwritten headline */}
      <div className="relative z-[2] pt-20 sm:pt-24 lg:pt-28 px-4 sm:px-8 text-center">
        <h1 className="font-script font-bold text-bp-ink leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-[64px]">
          ship a side project.{" "}
          <span className="text-bp-accent bp-underline-wavy">
            forget about GoDaddy.
          </span>
        </h1>
      </div>

      {/* === Hero canvas: claim form + decorations === */}
      <div className="relative z-[2] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14 pb-20 sm:pb-28 lg:pb-32">
        {/* Decorations: only render on lg+ where the spatial composition fits */}
        <div className="hidden lg:block absolute top-12 left-8 z-[3] -rotate-[5deg]">
          <BPSticky width={170}>
            ✎ totally free.
            <br />
            open source.
            <br />
            no credit card.
          </BPSticky>
        </div>

        <div className="hidden lg:block absolute top-6 right-8 z-[3]">
          <BPSSLStamp size={130} />
        </div>

        <div className="hidden lg:block absolute bottom-12 right-[280px] xl:right-[320px] z-[3] text-center">
          <BPGlobe size={92} />
          <div className="font-hand font-bold text-sm mt-1">global CDN</div>
        </div>

        <div className="hidden lg:block absolute bottom-24 left-12 z-[1]">
          <BPCoffeeRing size={80} />
        </div>

        {/* Centered claim form */}
        <div className="relative z-[2] flex justify-center">
          <SubdomainChecker />
        </div>

        {/* Authed shortcut to dashboard */}
        {isAuthenticated && (
          <div className="relative z-[2] mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="bp-btn bp-btn-graphite font-bold"
              style={{ fontSize: 16 }}
            >
              ⌨ {t("hero.goToDashboard")}
            </Link>
            <span className="text-bp-inkSoft text-sm">
              — {t("hero.manageSubdomains")}
            </span>
          </div>
        )}
      </div>

      {/* Title block cartouche — desktop only */}
      <div className="hidden lg:block">
        <TitleBlock sheet="A-103" title="DIY ASSEMBLY · v3" scale="N.T.S." />
      </div>
    </section>
  );
};

export default HeroSection;
