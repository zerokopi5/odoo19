import React from "react";
import { Composition } from "remotion";
import { Promo } from "./compositions/Promo";
import { Wide } from "./compositions/Wide";
import { promoProps, wideProps } from "./props";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Short-form vertical: TikTok / Reels / Shorts */}
      <Composition
        id="Promo"
        component={Promo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={promoProps}
      />

      {/* Landscape 16:9 for YouTube / embed */}
      <Composition
        id="Wide"
        component={Wide}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={wideProps}
      />
    </>
  );
};
