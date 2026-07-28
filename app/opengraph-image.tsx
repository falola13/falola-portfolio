import { ImageResponse } from "next/og";
import { headlineMetrics, profile } from "@/data/portfolio-data";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time rather than shipped as a binary, so the card never
 * drifts out of sync with the site's copy. Deliberately uses no remote fonts —
 * a network fetch here would break the build in an offline environment.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#131211",
          padding: "72px 80px",
          color: "#f0eeea",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top rule + accent dot */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#5cc4bb",
            }}
          />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#8a857e",
            }}
          >
            {`${profile.initials} · Portfolio`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -2.5,
              lineHeight: 1.02,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 34,
              lineHeight: 1.3,
              color: "#a8a29a",
              maxWidth: 900,
            }}
          >
            {`${profile.title} — moving into AI engineering`}
          </div>
        </div>

        {/* Metric strip */}
        <div
          style={{
            display: "flex",
            gap: 56,
            borderTop: "1px solid #302d2a",
            paddingTop: 32,
          }}
        >
          {headlineMetrics.map((metric) => (
            <div
              key={metric.label}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>
                {metric.value}
              </div>
              <div style={{ marginTop: 8, fontSize: 20, color: "#8a857e" }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
