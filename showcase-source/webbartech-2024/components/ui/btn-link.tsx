"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useI18n, useCurrentLocale } from "@/locales/client";

export const BtnLink = (props: {
  label: string;
  href: string;
  solid?: boolean;
}) => {
  const t = useI18n();
  const locale = useCurrentLocale();
  return (
    <Link
      href={`/${locale}/${props.href}`}
      className={clsx(
        "inner-border-2-slate-700 rounded-full font-normal border-slate-700 transition-all duration-100",
        "hover:inner-border-none hover:bg-sky-100 hover:bg-gradient-to-r hover:from-25% hover:text-white",
        `hover:from-[#60c3dc] hover:to-[#504d9b]`,
        "px-4 py-2 xl:px-6 xl:py-3 text-sm lg:text-xl"
      )}
    >
      {t(props.label as keyof typeof t)}
    </Link>
  );
};

export const BtnLinkMain = ({
  label,
  href,
  direction = "right",
}: {
  label: string;
  href: string;
  direction?: "left" | "right";
}) => {
  const t = useI18n();
  const locale = useCurrentLocale();
  const [hovered, setHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const right = direction === "right";
  const duration = 0.2;
  const ease = [0.25, 0.1, 0.25, 1];

  const effectiveHovered = !isAnimating && hovered;

  return (
    <>
      <motion.div
        className={clsx("relative w-60 h-14", right ? "-me-20" : "-ms-20")}
        initial={{ opacity: 0, x: right ? 50 : -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          initial={{ x: 0, opacity: 1, filter: "blur(0)" }}
          animate={{
            x: effectiveHovered ? (right ? "-5rem" : "5rem") : 0,
            opacity: effectiveHovered ? 0 : 1,
          }}
          transition={{ duration, ease }}
          className={clsx(
            "absolute top-0 inner-border-2-slate-700 rounded-full font-normal cursor-pointer",
            right ? "left-0" : "right-0",
            "h-14 w-40 flex items-center justify-center text-sm lg:text-base"
          )}
        >
          {t(label as keyof typeof t)}
        </motion.div>
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          initial={{
            x: right ? "10rem" : "-10rem",
            opacity: 1,
          }}
          animate={{
            x: effectiveHovered ? 0 : right ? "10rem" : "-10rem",
            opacity: effectiveHovered ? 1 : 0,
          }}
          transition={{ duration, ease }}
          className={clsx(
            "absolute top-0 w-60 h-14 cursor-pointer",
            right ? "left-0" : "right-0"
          )}
        >
          <Link
            href={`/${locale}/${href}`}
            className={clsx(
              "w-60 h-14 inset-0 flex items-center",
              "after:content-[''] after:absolute after:top-0 after:w-14 after:h-14 after:rounded-full after:from-[#29b7eb] after:to-[#504d9b] after:text-white",
              hovered ? "after:block" : "after:hidden",
              right
                ? "after:right-[107%] after:bg-gradient-to-l"
                : "after:left-[107%] after:bg-gradient-to-r",
              right
                ? `rounded-s-full bg-gradient-to-l from-25% from-[#60c3dc] to-[#504d9b] justify-start`
                : `rounded-e-full bg-gradient-to-r from-25% from-[#60c3dc] to-[#504d9b] justify-end`
            )}
          >
            <div className="w-40 h-full flex items-center justify-center text-slate-100">
              {t(label as keyof typeof t)}
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
};
