import { defineConfig } from "vite";
import RailsPlugin from "vite-plugin-rails";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [RailsPlugin(), react()],
});
