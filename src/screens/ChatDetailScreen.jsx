import { useState } from "react";
import GlassCard from "../components/GlassCard";

const MOCK_MESSAGES = [
  { id: "1", text: "Добрый день! Подтверждаете завтра на 9:00?", fromMe: false },
  { id: "2", text: "Да, всё в силе 👍", fromMe: true },
];

export default function ChatDetailScreen({ chat, onBack }) {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), text: draft, fromMe: true }]);
    setDraft("");
    // TODO: отправка через WebSocketManager-эквивалент (WebSocket на /content/chat/{roomId})
  };

  return (
    <div className="stack" style={{ height: "100%" }}>
      <div className="row gap-sm px-page glass-strong" style={{ padding: "16px 20px", flexShrink: 0 }}>
        <button onClick={onBack} className="btn-glass btn" style={{ padding: "6px 10px" }}>
          ←
        </button>
        <h3>{chat?.name || "Чат"}</h3>
      </div>

      <div className="stack gap-sm px-page" style={{ flex: 1, overflowY: "auto", paddingTop: 16 }}>
        {messages.map((m) => (
          <div
            key={m.id}
            className="glass"
            style={{
              alignSelf: m.fromMe ? "flex-end" : "flex-start",
              maxWidth: "75%",
              padding: "10px 14px",
              background: m.fromMe ? "var(--accent-mint)" : "var(--glass-fill)",
              color: m.fromMe ? "white" : "var(--ink-900)",
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="row gap-sm px-page" style={{ padding: "12px 20px 20px" }}>
        <GlassCard strong className="row" style={{ flex: 1, padding: "8px 14px" }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Сообщение…"
            style={{ border: "none", background: "none", outline: "none", width: "100%", fontFamily: "var(--font-body)" }}
          />
        </GlassCard>
        <button className="btn btn-primary" onClick={send}>
          →
        </button>
      </div>
    </div>
  );
}
