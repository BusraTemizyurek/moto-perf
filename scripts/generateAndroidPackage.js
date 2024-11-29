import fs from "fs";
import { Readable } from "stream";
import process from "process";

export async function generateAndroidPackage(outputFilePath) {
  const appHost = "moto-perf.vercel.app";
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
        host: appHost,
        iconUrl: `https://${appHost}/images/icon-512.png`,
        includeSourceCode: false,
        isChromeOSOnly: false,
        isMetaQuest: false,
        launcherName: "MotoPerf",
        maskableIconUrl: `https://${appHost}/images/icon-512-maskable.png`,
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
        webManifestUrl: `https://${appHost}/site.webmanifest`,
        pwaUrl: `https://${appHost}/`,
        fullScopeUrl: `https://${appHost}/`,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  await new Promise((resolve, reject) => {
    // Create a writable stream to save the file
    const fileStream = fs.createWriteStream(outputFilePath);

    // Convert the fetch response body (ReadableStream) into a Node.js stream
    const readableStream = Readable.fromWeb(response.body);

    // Pipe the response body into the writable stream
    readableStream.pipe(fileStream);

    // Ensure that the file write completes
    fileStream.on("finish", resolve);

    // Handle errors in the stream
    fileStream.on("error", (err) => {
      console.error(`Error writing the file: ${err.message}`);
      reject(err);
    });
  });
}
