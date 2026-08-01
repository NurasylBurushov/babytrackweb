import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: '/',  // <-- ДОБАВЬ ЭТУ СТРОКУ
  server: {
    host: true,
    port: 5173,
  },
});
