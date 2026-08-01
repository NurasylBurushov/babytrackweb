// Обёртка над window.Telegram.WebApp — безопасна и для запуска вне Telegram (в браузере при разработке)
const tg = typeof window !== "undefined" ? window.Telegram?.WebApp : null;

export function initTelegram() {
  if (!tg) return;
  tg.ready();
  tg.expand();
  // Подгоняем фон-шапку под наш дизайн, если Telegram это поддерживает
  try {
    tg.setHeaderColor?.("#dbe7f5");
    tg.setBackgroundColor?.("#f7ede4");
  } catch (_) {}
}

/** Сырые initData — отправляются на бэкенд для проверки подписи и логина */
export function getInitData() {
  return tg?.initData || "";
}

/** Уже распарсенные данные пользователя (id, имя, avatar и т.д.), НЕ для авторизации — только для UI */
export function getTelegramUser() {
  return tg?.initDataUnsafe?.user || null;
}

export function hapticSelection() {
  tg?.HapticFeedback?.selectionChanged?.();
}

export function hapticImpact(style = "light") {
  tg?.HapticFeedback?.impactOccurred?.(style);
}

export function showMainButton(text, onClick) {
  if (!tg) return;
  tg.MainButton.setText(text);
  tg.MainButton.onClick(onClick);
  tg.MainButton.show();
}

export function hideMainButton() {
  tg?.MainButton?.hide();
}

export function isRunningInTelegram() {
  return Boolean(tg && tg.initData);
}

export default tg;
