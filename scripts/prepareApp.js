"use strict";

import { generateAndroidPackage } from "./generateAndroidPackage.js";
import { extractZip } from "./extractZip.js";
import os from "os";
import path from "path";
import { copyFile, copyFileSync, existsSync, mkdirSync, rmSync } from "fs";
import { fileURLToPath } from "url";

// Path to moto-perf folder (aka root of this repository)
const repoRootPath = path.resolve(
  path.join(path.dirname(fileURLToPath(import.meta.url)), ".."),
);
const publicFolderPath = path.join(repoRootPath, "public");
const publicTempFolderPath = path.join(publicFolderPath, "temp");
const tempDir = path.join(os.tmpdir(), "tmp", "moto-perf");

// Remove and re-create temp folders
for (const folderPath of [tempDir, publicTempFolderPath]) {
  if (existsSync(folderPath)) {
    rmSync(folderPath, { recursive: true, force: true });
  }
  mkdirSync(folderPath, { recursive: true });
}

console.log("Android package is downloading...");
const androidZip = path.resolve(path.join(tempDir, "android.zip"));
await generateAndroidPackage(androidZip);
console.log(`Android package is download to ${androidZip}`);

console.log("Android package is extracting...");
const androidExtracted = path.resolve(path.join(tempDir, "android"));
await extractZip(androidZip, androidExtracted);
console.log(`Android package is extracted to ${androidExtracted}`);

// Copy assetlinks.json into public/.well-known
const assetlinksFileName = "assetlinks.json";
copyFileSync(
  path.join(androidExtracted, assetlinksFileName),
  path.join(publicFolderPath, ".well-known", assetlinksFileName),
);

// Copy MotoPerf.apk to public/temp
const apkFileName = "MotoPerf.apk";
copyFileSync(
  path.join(androidExtracted, apkFileName),
  path.join(publicFolderPath, "temp", apkFileName),
);

// Remove temp folder
rmSync(tempDir, { recursive: true, force: true });
