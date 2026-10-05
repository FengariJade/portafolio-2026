"use client";
import { useI18n } from "@/locales/client";

export const TextTranslation = ({ text }: { text: string }) => {
    const t = useI18n();
  return <>{t(text as keyof typeof t)}</>;
};
