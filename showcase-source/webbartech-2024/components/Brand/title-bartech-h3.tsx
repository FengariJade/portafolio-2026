"use client";

import { useI18n } from "@/locales/client";
import { clsx } from "clsx";

export const TitleBartechH3 = ({
  text,
  mono,
  className,
}: {
  text: string;
  mono?: boolean;
  className?: string;
}) => {
  const t = useI18n();

  return (
    <h3
      className={clsx(
        "uppercase font-semibold",
        "text-lg sm:text-xl xl:text-2xl",
        !mono
          ? "bg-gradient-to-b bg-clip-text text-transparent from-[#60c3dc] to-[#504d9b]"
          : "text-[#3f3f46]",
        className
      )}
    >
      {t(text as keyof typeof t)}
    </h3>
  );
};

