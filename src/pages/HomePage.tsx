import {
  HeroSection,
  HowItWorksSection,
  ExamplesSection,
  CommunityCTASection,
  BugReportButton,
} from "@/components";

const HomePage = () => {
  return (
    <div className="bg-bp-bg">
      <HeroSection />
      <HowItWorksSection />
      <ExamplesSection />
      <CommunityCTASection />
      <BugReportButton />
    </div>
  );
};

export default HomePage;
