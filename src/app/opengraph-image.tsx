import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "rgba(129, 140, 248, 0.15)",
            marginBottom: 24,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Sistem Pakar Gizi Buruk
        </h1>
        <p
          style={{
            fontSize: 24,
            color: "#94a3b8",
            marginTop: 12,
            textAlign: "center",
          }}
        >
          Diagnosa Marasmus, Kwarshiorkor & Marasmik-Kwarshiorkor
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 24,
          }}
        >
          <span
            style={{
              fontSize: 16,
              color: "#818cf8",
              background: "rgba(129, 140, 248, 0.1)",
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid rgba(129, 140, 248, 0.2)",
            }}
          >
            Certainty Factor
          </span>
          <span
            style={{
              fontSize: 16,
              color: "#34d399",
              background: "rgba(52, 211, 153, 0.1)",
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid rgba(52, 211, 153, 0.2)",
            }}
          >
            Gratis
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
