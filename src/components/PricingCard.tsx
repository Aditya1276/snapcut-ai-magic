import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  features: string[];
  popular?: boolean;
  ctaLabel: string;
  onCta: () => void;
}

const PricingCard = ({ name, price, period, features, popular, ctaLabel, onCta }: PricingCardProps) => (
  <div
    className={`relative rounded-2xl p-8 border transition-all duration-300 ${
      popular
        ? "gradient-border bg-card glow-purple scale-105"
        : "border-border bg-card hover:border-muted-foreground/40"
    }`}
  >
    {popular && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
        Most Popular
      </span>
    )}
    <h3 className="font-display text-xl font-bold mb-2">{name}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold font-display">{price}</span>
      {period && <span className="text-muted-foreground text-sm ml-1">/{period}</span>}
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((f) => (
        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="w-4 h-4 text-cyan" />
          {f}
        </li>
      ))}
    </ul>
    <Button
      variant={popular ? "gradient" : "gradient-outline"}
      className="w-full"
      onClick={onCta}
    >
      {ctaLabel}
    </Button>
  </div>
);

export default PricingCard;
