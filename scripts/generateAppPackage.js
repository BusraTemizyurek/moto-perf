import fs from "fs";
import path from "path";
import process from "process";

async function downloadAppPackage(outputFilePath) {
  const response = await fetch(
    "https://pwabuilder-cloudapk.azurewebsites.net/generateAppPackage",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,tr;q=0.8,vi;q=0.7",
        "content-type": "application/json",
        "correlation-id": "f5421b9e-58fe-4d45-a83b-d64853c9d681",
        "platform-identifier": "PWABuilder",
        "platform-identifier-version": "1.0.0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
      },
      method: "POST",
      body: JSON.stringify({
        appVersion: "1.0.0.0",
        appVersionCode: 1,
        backgroundColor: "#212529",
        display: "standalone",
        enableNotifications: true,
        enableSiteSettingsShortcut: true,
        fallbackType: "customtabs",
        features: {
          locationDelegation: { enabled: false },
          playBilling: { enabled: false },
        },
        host: "moto-perf.vercel.app",
        iconUrl: "https://moto-perf.vercel.app/images/icon-512.png",
        includeSourceCode: false,
        isChromeOSOnly: false,
        isMetaQuest: false,
        launcherName: "MotoPerf",
        maskableIconUrl:
          "https://moto-perf.vercel.app/images/icon-512-maskable.png",
        monochromeIconUrl: "",
        name: "MotoPerf",
        navigationColor: "#212529",
        navigationColorDark: "#212529",
        navigationDividerColor: "#212529",
        navigationDividerColorDark: "#212529",
        orientation: "portrait",
        packageId: "app.vercel.moto_perf.twa",
        shortcuts: [],
        signing: {
          file: null,
          alias: "my-key-alias",
          fullName: "MotoPerf Admin",
          organization: "Moto-Perf",
          organizationalUnit: "Engineering",
          countryCode: "US",
          keyPassword: "",
          storePassword: "",
        },
        signingMode: "new",
        splashScreenFadeOutDuration: 300,
        startUrl: "/",
        themeColor: "#212529",
        themeColorDark: "#212529",
        webManifestUrl: "https://moto-perf.vercel.app/site.webmanifest",
        pwaUrl: "https://moto-perf.vercel.app/",
        fullScopeUrl: "https://moto-perf.vercel.app/",
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Create a write stream to save the file
  const fileStream = fs.createWriteStream(outputFilePath);

  // Pipe the response body directly into the file
  await new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    response.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
}

// Get output file path from command-line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("Usage: node script.js <url> <outputFilePath>");
  process.exit(1);
}

const outputFilePath = path.resolve(args[0]);

// Download the file
downloadAppPackage(outputFilePath)
  .then(() => console.log("Download complete"))
  .catch((err) => console.error("Error:", err));
