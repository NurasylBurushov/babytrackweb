import { useState } from "react";
import GlassCard from "../components/GlassCard";
import { getInitData, getTelegramUser, isRunningInTelegram } from "../lib/telegram";
import { api, setAuthToken } from "../lib/api";

export default function AuthScreen({ onAuthenticated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const tgUser = getTelegramUser();

  const handleTelegramLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const initData = getInitData();
      const { access_token } = await api.loginWithTelegram(initData);
      setAuthToken(access_token);
      const profile = await api.fetchProfile();
      onAuthenticated(profile);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stack px-page gap-lg" style={{ height: "100%", justifyContent: "center" }}>
      <div className="stack gap-sm" style={{ alignItems: "center", textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>🧸</div>
        <h1>SabiTrack</h1>
        <p style={{ color: "var(--ink-600)" }}>
          Проверенные няни и помощники рядом с вами
        </p>
      </div>

      <GlassCard strong className="stack gap-md">
        {tgUser ? (
          <div className="row gap-sm">
            {tgUser.photo_url && (
              <img
                src={tgUser.photo_url}
                alt=""
                style={{ width: 40, height: 40, borderRadius: "50%" }}
              />
            )}
            <div>
              <div style={{ fontWeight: 600 }}>{tgUser.first_name} {tgUser.last_name || ""}</div>
              <div className="eyebrow">Telegram аккаунт</div>
            </div>
          </div>
        ) : (
          <p style={{ color: "var(--ink-600)", fontSize: 14 }}>
            Откройте приложение через бота в Telegram, чтобы войти в один клик.
          </p>
        )}

        <button
          className="btn btn-primary btn-block"
          disabled={loading || !isRunningInTelegram()}
          onClick={handleTelegramLogin}
        >
          {loading ? "Входим…" : "Продолжить с Telegram"}
        </button>

        {!isRunningInTelegram() && (
          <p style={{ fontSize: 12, color: "var(--ink-400)", textAlign: "center" }}>
            Вы открыли сайт не из Telegram — вход недоступен в превью
          </p>
        )}

        {error && (
          <p style={{ fontSize: 13, color: "var(--accent-coral)" }}>{error}</p>
        )}
      </GlassCard>
    </div>
  );
}
