import { hapticSelection } from "../lib/telegram";

const TABS = [
  { id: "home", label: "Главная", icon: "🏠" },
  { id: "market", label: "Маркет", icon: "🛍️" },
  { id: "chats", label: "Чаты", icon: "💬" },
  { id: "profile", label: "Профиль", icon: "👤" },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav
      className="glass-strong row"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        borderRadius: 24,
        padding: "10px 8px",
        justifyContent: "space-between",
        zIndex: 10,
      }}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              hapticSelection();
              onChange(tab.id);
            }}
            className="stack gap-xs"
            style={{
              flex: 1,
              alignItems: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 4px",
              borderRadius: 16,
              color: isActive ? "var(--accent-mint-dark)" : "var(--ink-400)",
              transition: "color 0.15s ease",
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 600 }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
