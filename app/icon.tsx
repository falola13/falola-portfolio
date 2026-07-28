import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon, generated so there's no missing-icon 404 and no binary to maintain. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#131211",
          color: "#f0eeea",
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: -1.5,
          fontFamily: "sans-serif",
          borderRadius: 14,
        }}
      >
        F
        <span style={{ color: "#5cc4bb" }}>.</span>
      </div>
    ),
    size,
  );
}
