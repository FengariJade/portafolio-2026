"use client";

import { useI18n } from "@/locales/client";
import clsx from "clsx";

type Level = "h2" | "h3" | "h4";

const sizes = {
  h2: "text-3xl sm:text-4xl lg:text-5xl",
  h3: "text-lg sm:text-xl xl:text-2xl",
  h4: "text-base sm:text-lg xl:text-xl",
};

export const TitleBartechText = ({
  text,
  level = "h3",
  mono,
  className,
}: {
  text: string;
  level?: Level;
  mono?: boolean;
  className?: string;
}) => {
  const t = useI18n();
  const Tag = level;

  return (
    <Tag
      className={clsx(
        "font-dmsans uppercase font-bold",
        sizes[level],
        !mono
          ? "bg-gradient-to-b bg-clip-text text-transparent from-[#60c3dc] to-[#504d9b]"
          : "text-[#3f3f46]",
        className
      )}
    >
      {t(text as keyof typeof t)}
    </Tag>
  );
};
