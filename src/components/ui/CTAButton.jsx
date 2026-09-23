import { ArrowRight } from "lucide-react";

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-200";

  const variants = {
    primary:
      "bg-gold text-charcoal hover:-translate-y-0.5 hover:shadow-glow",
    secondary:
      "border border-cream/30 text-cream hover:bg-cream/10",
    "secondary-light":
      "border border-ink/20 text-ink hover:bg-ink/5",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      <ArrowRight
        size={16}
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </a>
  );
}
