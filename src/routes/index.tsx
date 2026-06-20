import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rudra Graphics Pune — Branding, Printing & Signage Agency" },
      { name: "description", content: "Premium branding, printing, signage & advertising solutions in Hadapsar, Pune. 500+ projects, 5★ rating." },
      { property: "og:title", content: "Rudra Graphics Pune — Branding, Printing & Signage Agency" },
      { property: "og:description", content: "Premium branding, printing, signage & advertising solutions in Hadapsar, Pune." },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/site/index.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", color: "#0F172A" }}>
      <a href="/site/index.html" style={{ color: "#0EA5E9" }}>Loading Rudra Graphics Pune…</a>
    </div>
  );
}
