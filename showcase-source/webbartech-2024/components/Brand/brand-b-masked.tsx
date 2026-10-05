"use client";

import { AnimatedGradient } from "./animated-brand";

export const BrandBMasked = ({ className }: { className?: string }) => {
  return (
    <div
      className={`relative ${className}`}
      style={{
        WebkitMaskImage: "url('/images/home/brand-b-mask.svg')",
        maskImage: "url('/images/home/brand-b-mask.svg')",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    >
      <AnimatedGradient />
    </div>
  );
};
