import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const normalizeBasePath = (value: string): string => {
  const path = value.trim().replace(/^\/+|\/+$/g, "");
  return path ? `/${path}/` : "/";
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const githubRepository = env.GITHUB_REPOSITORY?.split("/")[1];
  const githubPagesBase =
    env.GITHUB_ACTIONS === "true" && githubRepository
      ? `/${githubRepository}/`
      : "/";

  return {
    base: env.VITE_BASE_PATH
      ? normalizeBasePath(env.VITE_BASE_PATH)
      : githubPagesBase,
    plugins: [react()],
  };
});
