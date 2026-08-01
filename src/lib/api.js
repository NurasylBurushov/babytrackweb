const BASE_URL = "https://sabitrack-production.up.railway.app";

let authToken = localStorage.getItem("auth_token") || null;

export function setAuthToken(token) {
  authToken = token;
  if (token) localStorage.setItem("auth_token", token);
  else localStorage.removeItem("auth_token");
}

export function getAuthToken() {
  return authToken;
}

async function request(endpoint, { method = "GET", body, headers = {} } = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = "Ошибка сервера";
    try {
      const errJson = await res.json();
      message = errJson.detail || errJson.message || message;
    } catch (_) {}
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // ── Auth ──────────────────────────────────────────────
  // Вход через Telegram: initData проверяется на бэкенде (нужно добавить роут /auth/telegram)
  loginWithTelegram: (initData) =>
    request("/auth/telegram", { method: "POST", body: { init_data: initData } }),

  // Резервный SMS-логин (если открываете сайт не только из Telegram)
  sendOtp: (phone) => request("/auth/send-otp", { method: "POST", body: { phone } }),
  verifyOtp: (phone, code) =>
    request("/auth/verify-otp", { method: "POST", body: { phone, code } }),

  // ── User ──────────────────────────────────────────────
  fetchProfile: () => request("/users/me"),
  updateProfile: (data) => request("/users/me", { method: "PATCH", body: data }),
  searchUsers: (query) => request(`/users/search?q=${encodeURIComponent(query)}`),

  // ── Nannies ───────────────────────────────────────────
  fetchNannies: (params = "") => request(`/nannies${params}`),

  // ── Uploads ───────────────────────────────────────────
  async uploadImage(file, purpose) {
    const presign = await request("/uploads/presign", {
      method: "POST",
      body: { purpose, content_type: file.type || "image/jpeg" },
    });
    await fetch(presign.upload_url, {
      method: "PUT",
      headers: presign.required_headers || { "Content-Type": file.type },
      body: file,
    });
    return presign.public_url;
  },

  // ── Content ───────────────────────────────────────────
  createStory: (mediaUrl) => request("/content/stories", { method: "POST", body: { media_url: mediaUrl } }),
  fetchStories: (userId) => request(`/content/stories/${userId}`),
  createPost: (mediaUrl, caption) =>
    request("/content/posts", { method: "POST", body: { media_url: mediaUrl, caption } }),
};
