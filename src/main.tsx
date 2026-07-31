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

// Remove the static HTML splash once React (and its own loading screen) is mounted
requestAnimationFrame(() => {
  document.getElementById("initial-splash")?.remove();
});
