export default function GlassCard({ children, strong = false, style, className = "", onClick }) {
  return (
    <div
      className={`glass ${strong ? "glass-strong" : ""} ${className}`}
      style={{ padding: 18, ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
