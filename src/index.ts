import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import { SessionRepository } from "./services/session-repository";
import { OrientationManager } from "./services/orientation-manager";
import { LocationManager } from "./services/location-manager";
import { Router } from "./services/router";
import { MainPage } from "./pages/main-page";
import { WakeLockManager } from "./services/wake-lock-manager";

document.documentElement.setAttribute(
  "data-bs-theme",
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    );
  });

window.onload = async () => {
  const sessionRepository = new SessionRepository();
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("No root element available");
  }

  const orientationManager = new OrientationManager();
  const locationManager = new LocationManager();
  const wakeLockManager = new WakeLockManager();

  const router = new Router(root);

  router.register("main", () => {
    const mainPage = new MainPage(
      router,
      sessionRepository,
      orientationManager,
      locationManager,
      wakeLockManager,
    );
    return Promise.resolve(mainPage);
  });

  router.register("recording", async () => {
    const RecordingPage = await import(
      /* webpackChunkName: "recording-page" */ "./pages/recording-page"
    ).then((m) => m.RecordingPage);
    const recordingPage = new RecordingPage(
      locationManager,
      orientationManager,
      router,
      wakeLockManager,
    );
    return recordingPage;
  });

  router.register("summary", async () => {
    const SummaryPage = await import(
      /* webpackChunkName: "summary-page" */ "./pages/summary-page"
    ).then((module) => module.SummaryPage);
    const summaryPage = new SummaryPage(
      router,
      sessionRepository,
      locationManager,
    );
    return summaryPage;
  });

  await router.navigate("main");
};
