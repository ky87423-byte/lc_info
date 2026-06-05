import { ImageResponse } from "next/og";

export const alt = "DEATH ACADEMY — Lineage Classic Leveling Service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 참고: ImageResponse 기본 폰트는 한글을 지원하지 않아 영문으로 구성
export default function OgImage() {
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
          background:
            "radial-gradient(ellipse at top, #3f0d0d 0%, #09090b 60%)",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 12,
            color: "#ef4444",
            fontWeight: 700,
          }}
        >
          LINEAGE CLASSIC
        </div>
        <div style={{ fontSize: 96, fontWeight: 900, marginTop: 16 }}>
          DEATH ACADEMY
        </div>
        <div style={{ fontSize: 32, color: "#a1a1aa", marginTop: 24 }}>
          Professional Character Leveling Service
        </div>
      </div>
    ),
    size
  );
}
