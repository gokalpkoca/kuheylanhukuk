import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;
createRoot(rootElement).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Single, seamless splash: fade out the static HTML splash after the first paint.
const splash = document.getElementById("initial-splash");
if (splash) {
  window.setTimeout(() => {
    splash.classList.add("is-hidden");
    window.setTimeout(() => splash.remove(), 450);
  }, 1620);
}
