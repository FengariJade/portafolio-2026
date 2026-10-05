"use client";

import { separateText, splitTextIntoChunks } from "@/utils/functions";
import { clsx } from "clsx";
import React from "react";

interface SubtitleProps {
  value: string;
  color?: "light" | "dark";
  chars?: number;
  align?: "left" | "center" | "right";
  isTitle?: boolean;
}

export const SubtitleBartech = ({
  value,
  color,
  chars,
  align = "left",
  isTitle = true,
}: SubtitleProps) => {
  const ch = chars ? chars : 30;
  const [lines, setLines] = React.useState<string[]>(
    splitTextIntoChunks(value, ch, isTitle).map((line) => line.toLowerCase())
  );
  console.log("lines", lines);
  const textColor = color == "light" ? "text-slate-200" : "text-slate-700";
  const alignClass =
    align === "center"
      ? "justify-center items-center"
      : align === "right"
      ? "justify-end items-end"
      : "justify-start items-start";

  return (
    <div className="subtitle__side subtitle__side_prev pb-6">
      <h2
        className={clsx(
          "flex md:flex-col gap-4 uppercase title_font_up text-center lg:text-start",
          textColor,
          alignClass
        )}>
        {lines.map((line, i) => (
          <span
            key={`line${i}`}
            className="flex-grow-0 leading-[1] text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.75rem] xl:text-[4.5rem] 2xl:text-[4.5rem]"
          >
            {line}
          </span>
        ))}
      </h2>
    </div>
  );
};
