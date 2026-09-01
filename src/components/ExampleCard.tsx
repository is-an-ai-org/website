import { BlueprintCard } from "./blueprint";

interface ExampleCardProps {
  subdomain: string;
  description: string;
  status?: string;
}

const ExampleCard = ({
  subdomain,
  description,
  status = "ACTIVE",
}: ExampleCardProps) => {
  return (
    <BlueprintCard
      className="p-4 hover:bg-white transition-colors group"
      noSnapCorners
    >
      <div className="flex items-center justify-between mb-2 gap-2">
        <a
          href={`https://${subdomain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-bp-accent text-base group-hover:underline truncate"
        >
          {subdomain}
        </a>
        <span className="font-mono text-[9px] tracking-tape border border-bp-accent2 text-bp-accent2 px-1.5 py-0.5 flex-shrink-0">
          ● {status}
        </span>
      </div>
      <p className="text-bp-ink text-sm leading-snug">{description}</p>
    </BlueprintCard>
  );
};

export default ExampleCard;
