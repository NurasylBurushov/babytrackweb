import { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard";
import { api } from "../lib/api";

// Заглушки на случай, если бэкенд ещё не отдаёт этот список —
// как только пришлёте реальные поля модели Nanny, поправим маппинг ниже.
const FALLBACK_NANNIES = [
  { id: "1", name: "Айгерим Б.", rating: 4.9, experienceYears: 5, pricePerHour: 2500, avatar: null },
  { id: "2", name: "Динара С.", rating: 4.8, experienceYears: 3, pricePerHour: 2000, avatar: null },
  { id: "3", name: "Мадина К.", rating: 5.0, experienceYears: 7, pricePerHour: 3000, avatar: null },
];

export default function HomeScreen({ user }) {
  const [nannies, setNannies] = useState(FALLBACK_NANNIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .fetchNannies()
      .then((data) => setNannies(Array.isArray(data) && data.length ? data : FALLBACK_NANNIES))
      .catch(() => setNannies(FALLBACK_NANNIES))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="stack px-page gap-lg" style={{ paddingTop: 20 }}>
      <div className="stack gap-xs">
        <span className="eyebrow">Привет{user?.name ? `, ${user.name}` : ""} 👋</span>
        <h1>Найдём няню сегодня</h1>
      </div>

      <GlassCard className="row gap-sm">
        <span style={{ fontSize: 18 }}>🔍</span>
        <input
          placeholder="Район, опыт, язык…"
          style={{
            border: "none",
            background: "none",
            outline: "none",
            fontSize: 15,
            width: "100%",
            fontFamily: "var(--font-body)",
          }}
        />
      </GlassCard>

      <div className="stack gap-sm">
        <h2>Рядом с вами</h2>
        {loading && <p style={{ color: "var(--ink-400)" }}>Загружаем…</p>}
        {nannies.map((nanny) => (
          <GlassCard key={nanny.id} className="row gap-md" style={{ alignItems: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: "linear-gradient(135deg, var(--accent-mint), var(--accent-apricot))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "white",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              {nanny.avatar ? (
                <img src={nanny.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                nanny.name?.[0] || "?"
              )}
            </div>
            <div className="stack gap-xs" style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{nanny.name}</div>
              <div style={{ fontSize: 13, color: "var(--ink-600)" }}>
                ⭐ {nanny.rating} · {nanny.experienceYears} лет опыта
              </div>
            </div>
            <div className="stack" style={{ alignItems: "flex-end" }}>
              <span style={{ fontWeight: 700, color: "var(--accent-mint-dark)" }}>
                {nanny.pricePerHour?.toLocaleString("ru-RU")} ₸
              </span>
              <span style={{ fontSize: 11, color: "var(--ink-400)" }}>в час</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
