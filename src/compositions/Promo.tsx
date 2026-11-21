import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { PromoProps } from "../props";

export const Promo: React.FC<PromoProps> = ({
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
    config: { damping: 14, mass: 0.8, stiffness: 90 },
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames - 2],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const drift = interpolate(frame, [0, durationInFrames], [40, -40]);
  const glow = interpolate(
    frame % 90,
    [0, 45, 90],
    [0.25, 0.55, 0.25],
    { extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070b18",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        opacity: fadeOut,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% ${30 + drift * 0.2}%, ${accent}55 0%, transparent 55%)`,
          opacity: glow,
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(160deg, #070b18 20%, #0e1730 60%, #070b18 100%)`,
          opacity: 0.85,
        }}
      />

      <div
        style={{
          width: 880,
          display: "flex",
          flexDirection: "column",
          gap: 36,
          transform: `translateY(${(1 - enter) * 80}px)`,
          opacity: enter,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 34,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: accent,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 64,
              height: 4,
              backgroundColor: accent,
              borderRadius: 999,
            }}
          />
          {eyebrow}
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 132,
            lineHeight: 1.02,
            letterSpacing: -4,
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
            fontSize: 46,
            lineHeight: 1.35,
            color: "#94a3b8",
            fontWeight: 400,
            maxWidth: 780,
          }}
        >
          {subtitle}
        </p>

        <div
          style={{
            marginTop: 24,
            alignSelf: "flex-start",
            padding: "18px 34px",
            borderRadius: 999,
            border: `2px solid ${accent}66`,
            backgroundColor: `${accent}14`,
            color: "#e2e8f0",
            fontSize: 30,
            letterSpacing: 2,
            fontWeight: 600,
          }}
        >
          {badge}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 90,
          width: 880,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 26,
          color: "#475569",
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        <span>remotion</span>
        <span>
          frame {String(frame).padStart(3, "0")} / {durationInFrames}
        </span>
      </div>
    </AbsoluteFill>
  );
};
