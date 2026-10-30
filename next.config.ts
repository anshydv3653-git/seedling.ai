import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Webpack ko gaxios aur google genai bundle karne se rokta hai
  serverExternalPackages: ["@google/genai", "gaxios"],
};

export default nextConfig;