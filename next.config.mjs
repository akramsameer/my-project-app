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

const featuresPath = hasPro
  ? path.join(proPath, "src", "index.ts")
  : path.resolve(__dirname, "src", "features", "index.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: hasPro ? [proPath] : [],
  webpack: (config) => {
    config.resolve.alias["@features"] = featuresPath;
    return config;
  },
};

export default nextConfig;
