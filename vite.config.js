import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // нужно, чтобы Telegram (через ngrok/туннель) мог достучаться при разработке
    port: 5173,
  },
});
