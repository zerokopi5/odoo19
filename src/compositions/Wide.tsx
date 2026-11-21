import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { PromoProps } from "../props";

export const Wide: React.FC<PromoProps> = ({
  eyebrow,
  title,
  subtitle,
  accent,
  badge,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 16, mass: 1, stiffness: 80 },
  });
  const slide = spring({
    frame: frame - 8,
    fps,
    config: { damping: 18, mass: 1, stiffness: 70 },
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames - 2],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const sweep = interpolate(frame, [0, durationInFrames], [-30, 130]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#05070f",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        opacity: fadeOut,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background: `linear-gradient(115deg, #05070f 35%, #0c1428 65%, #05070f 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(100deg, transparent ${sweep}%, ${accent}22 ${
            sweep + 18
          }%, transparent ${sweep + 36}%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 140,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          width: 1100,
          transform: `translateX(${(1 - enter) * -60}px)`,
          opacity: enter,
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: accent,
            fontWeight: 700,
          }}
        >
          {eyebrow}
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 116,
            lineHeight: 1.03,
            letterSpacing: -3,
            color: "#f8fafc",
            whiteSpace: "pre-line",
            fontWeight: 800,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 40,
            color: "#94a3b8",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          right: 140,
          top: "50%",
          transform: `translateY(-50%) translateX(${(1 - slide) * 80}px)`,
          opacity: slide,
          width: 420,
          padding: 44,
          borderRadius: 32,
          border: `2px solid ${accent}55`,
          backgroundColor: `${accent}12`,
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            backgroundColor: accent,
            marginBottom: 28,
          }}
        />
        <div style={{ fontSize: 34, color: "#e2e8f0", fontWeight: 700 }}>
          {badge}
        </div>
        <div style={{ marginTop: 14, fontSize: 24, color: "#7c8aa5" }}>
          render with a single command
        </div>
        <div
          style={{
            marginTop: 32,
            height: 6,
            borderRadius: 999,
            backgroundColor: "#1e293b",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(frame / durationInFrames) * 100}%`,
              height: "100%",
              backgroundColor: accent,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
