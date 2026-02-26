import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Auto-detect pro as a sibling directory (../pro)
const proPath = path.resolve(__dirname, "..", "pro");
const hasPro = fs.existsSync(path.join(proPath, "src", "index.ts"));

if (hasPro) {
  console.log("✓ Pro features detected at:", proPath);
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
    // Debug: log alias type and existing @features alias
    console.log("  Alias type:", typeof config.resolve.alias, Array.isArray(config.resolve.alias));
    console.log("  Existing @features alias:", config.resolve.alias?.["@features"]);
    console.log("  Setting @features →", featuresPath);

    config.resolve.alias["@features"] = featuresPath;
    return config;
  },
};

export default nextConfig;
