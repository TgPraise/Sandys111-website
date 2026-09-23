export default function Price({ price, status, className = "" }) {
  if (status === "pending" || price == null) {
    return <span className={`italic text-paper-dim ${className}`}>Menu TBC</span>;
  }
  return <span className={className}>{price}</span>;
}
