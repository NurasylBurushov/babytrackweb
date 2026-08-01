import GlassCard from "../components/GlassCard";

const MOCK_PRODUCTS = [
  { id: "1", title: "Коляска 3 в 1", price: 145000, image: null },
  { id: "2", title: "Кроватка-трансформер", price: 89000, image: null },
  { id: "3", title: "Автокресло 0-18кг", price: 62000, image: null },
  { id: "4", title: "Радионяня видео", price: 34000, image: null },
];

export default function MarketScreen() {
  return (
    <div className="stack px-page gap-lg" style={{ paddingTop: 20 }}>
      <h1>Маркет</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
        }}
      >
        {MOCK_PRODUCTS.map((p) => (
          <GlassCard key={p.id} className="stack gap-sm" style={{ padding: 14 }}>
            <div
              style={{
                aspectRatio: "1",
                borderRadius: 16,
                background: "linear-gradient(135deg, var(--accent-apricot), var(--accent-mint))",
                opacity: 0.5,
              }}
            />
            <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{p.title}</div>
            <div style={{ fontWeight: 700, color: "var(--accent-mint-dark)" }}>
              {p.price.toLocaleString("ru-RU")} ₸
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
