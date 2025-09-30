import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig((mode) => {
  const env = loadEnv(mode.mode, "../.env");

  return {
    plugins: [react()],
    server: { port: +env.VITE_PORT },
    environments: {
      API_BASE_URL: {
        define: {
          API_BASE_URL: env.API_BASE_URL,
        },
      },
    },
  };
});
