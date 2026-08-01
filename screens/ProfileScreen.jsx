import GlassCard from "../components/GlassCard";

export default function ProfileScreen({ user, onLogout }) {
  return (
    <div className="stack px-page gap-lg" style={{ paddingTop: 20 }}>
      <h1>Профиль</h1>

      <GlassCard strong className="row gap-md" style={{ alignItems: "center" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            background: "var(--accent-mint)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
            overflow: "hidden",
          }}
        >
          {user?.avatar ? (
            <img src={user.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            user?.name?.[0] || "?"
          )}
        </div>
        <div className="stack gap-xs">
          <div style={{ fontWeight: 700, fontSize: 17 }}>{user?.name || "Без имени"}</div>
          <div className="eyebrow">{user?.role === "nanny" ? "Няня" : "Родитель"}</div>
        </div>
      </GlassCard>

      <div className="stack gap-sm">
        {[
          { icon: "💳", label: "Способы оплаты" },
          { icon: "📍", label: "Мои адреса" },
          { icon: "🔔", label: "Уведомления" },
          { icon: "🛟", label: "Поддержка" },
        ].map((item) => (
          <GlassCard key={item.label} className="row gap-md" style={{ cursor: "pointer" }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span style={{ fontWeight: 500 }}>{item.label}</span>
          </GlassCard>
        ))}
      </div>

      <button className="btn btn-glass btn-block" onClick={onLogout}>
        Выйти
      </button>
    </div>
  );
}
