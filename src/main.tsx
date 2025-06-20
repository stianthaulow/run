import App from "@/App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/i18n";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
