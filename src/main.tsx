import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("[DEBUG] main.tsx loaded");
console.log("[DEBUG] root element:", document.getElementById("root"));

try {
  const root = document.getElementById("root");
  if (!root) {
    console.error("[ERROR] Root element not found!");
    document.body.innerHTML = "<h1>Error: Root element not found</h1>";
  } else {
    console.log("[DEBUG] Creating React root...");
    createRoot(root).render(<App />);
    console.log("[DEBUG] App rendered successfully");
  }
} catch (err) {
  console.error("[ERROR] Failed to render app:", err);
  document.body.innerHTML = `<h1>Error: ${err instanceof Error ? err.message : String(err)}</h1><p><pre>${err instanceof Error ? err.stack : ''}</pre></p>`;
}
