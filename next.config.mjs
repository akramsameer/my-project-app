import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Auto-detect pro as a sibling directory (../pro)
// Works when this app is inside a monorepo alongside packages/pro/
const proPath = path.resolve(__dirname, "..", "pro");
const hasPro = fs.existsSync(path.join(proPath, "src", "index.ts"));

if (hasPro) {
  console.log("✓ Pro features detected");
} else {
  console.log("○ Running open-source edition");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: hasPro ? [proPath] : [],
  webpack: (config) => {
    // Swap feature stubs with real pro implementations when available
    config.resolve.alias["@features"] = hasPro
      ? path.join(proPath, "src")
      : path.resolve(__dirname, "src/features");
    return config;
  },
};

export default nextConfig;
