import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import RailsPlugin from "vite-plugin-rails";

export default defineConfig({
  plugins: [react(), RailsPlugin()],
});
