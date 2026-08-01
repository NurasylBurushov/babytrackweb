import { useEffect, useState } from "react";
import { initTelegram } from "./lib/telegram";
import { getAuthToken, setAuthToken, api } from "./lib/api";
import BottomNav from "./components/BottomNav";
import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";
import MarketScreen from "./screens/MarketScreen";
import ChatListScreen from "./screens/ChatListScreen";
import ChatDetailScreen from "./screens/ChatDetailScreen";
import ProfileScreen from "./screens/ProfileScreen";

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [tab, setTab] = useState("home");
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    initTelegram();

    // Если токен уже сохранён с прошлого визита — пробуем восстановить сессию
    if (getAuthToken()) {
      api
        .fetchProfile()
        .then(setUser)
        .catch(() => setAuthToken(null))
        .finally(() => setCheckingSession(false));
    } else {
      setCheckingSession(false);
    }
  }, []);

  if (checkingSession) {
    return (
      <div className="app-shell">
        <div className="stack" style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 40 }}>🧸</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app-shell">
        <AuthScreen onAuthenticated={setUser} />
      </div>
    );
  }

  const handleLogout = () => {
    setAuthToken(null);
    setUser(null);
  };

  return (
    <div className="app-shell">
      <div className="app-scroll">
        {tab === "home" && <HomeScreen user={user} />}
        {tab === "market" && <MarketScreen />}
        {tab === "chats" &&
          (activeChat ? (
            <ChatDetailScreen chat={activeChat} onBack={() => setActiveChat(null)} />
          ) : (
            <ChatListScreen onOpenChat={setActiveChat} />
          ))}
        {tab === "profile" && <ProfileScreen user={user} onLogout={handleLogout} />}
      </div>

      {!(tab === "chats" && activeChat) && (
        <BottomNav
          active={tab}
          onChange={(next) => {
            setActiveChat(null);
            setTab(next);
          }}
        />
      )}
    </div>
  );
}
