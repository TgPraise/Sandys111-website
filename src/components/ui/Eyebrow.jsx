export default function Eyebrow({ children, className = "" }) {
  return (
    <p className={`mb-3 text-sm tracking-wide text-gold ${className}`}>{children}</p>
  );
}
