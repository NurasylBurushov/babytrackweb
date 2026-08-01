import GlassCard from "../components/GlassCard";

const MOCK_CHATS = [
  { id: "1", name: "Айгерим Б.", lastMessage: "Хорошо, буду в 9:00", unread: 2, time: "12:04" },
  { id: "2", name: "Мадина К.", lastMessage: "Спасибо за отзыв 🙏", unread: 0, time: "вчера" },
];

export default function ChatListScreen({ onOpenChat }) {
  return (
    <div className="stack px-page gap-lg" style={{ paddingTop: 20 }}>
      <h1>Чаты</h1>
      <div className="stack gap-sm">
        {MOCK_CHATS.map((chat) => (
          <GlassCard
            key={chat.id}
            className="row gap-md"
            style={{ alignItems: "center", cursor: "pointer" }}
            onClick={() => onOpenChat(chat)}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "var(--accent-mint)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {chat.name[0]}
            </div>
            <div className="stack gap-xs" style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600 }}>{chat.name}</div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--ink-600)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {chat.lastMessage}
              </div>
            </div>
            <div className="stack gap-xs" style={{ alignItems: "flex-end" }}>
              <span style={{ fontSize: 11, color: "var(--ink-400)" }}>{chat.time}</span>
              {chat.unread > 0 && (
                <span
                  style={{
                    background: "var(--accent-coral)",
                    color: "white",
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 999,
                    minWidth: 18,
                    height: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 5px",
                  }}
                >
                  {chat.unread}
                </span>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
