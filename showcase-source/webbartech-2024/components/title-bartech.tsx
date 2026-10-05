"use client";

import { esPar, splitTextIntoChunks } from "@/utils/functions";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { colors, textColor } from "@/utils/constants";
import { useI18n } from "@/locales/client";
import { clsx } from "clsx";

// Props para cada línea animada
interface ParallaxProps {
  children: React.ReactNode;
  direction: "left" | "right";
  color: string;
  className?: string;
}

// Componente animado
const ParallaxText = ({ children, direction, color, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const initialX = direction === "left" ? -100 : 100;

  return (
    <div ref={ref} className={clsx("flex-grow-0", className)}>
      <motion.div
        initial={{ x: initialX, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 120, damping: 20, duration: 1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Título principal
export const TitleBartech = (params: {
  title: string;
  chars: number;
  color?: string;
  direction?: "left" | "right";
  largeOnLg?: boolean;
}) => {
  const [lines] = useState<string[]>(
    splitTextIntoChunks(params.title, params.chars, true).map((line) => line.toLowerCase())
  );

  return (
    <h2
      className={clsx(
        "flex flex-col uppercase font-semibold title_font_dm text-[#3f3f46]",
        params.direction === "right"
          ? "justify-end items-end"
          : "justify-start items-start"
      )}
    >
      {lines.map((line, i) => (
        <ParallaxText
          key={`line${i}`}
          direction={esPar(i) ? "right" : "left"}
          color={params.color || textColor}
          className={clsx(
            "text-[2.5rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[5rem] lg:-mt-[3rem]",
            params.largeOnLg && "lg:text-[8rem] xl:text-[9rem] 2xl:text-[10rem]"
          )}
        >
          <span>{line}</span>
        </ParallaxText>
      ))}
    </h2>
  );
};

// Título medio
export const TitleBartechMedio = (props: {
  title: string;
  chars: number;
  color?: string;
  direction?: "left" | "right";
}) => {
  return <TitleBartech {...props} largeOnLg={false} />;
};

// Version 2
export const TitleBartech2 = ({
  first,
  second,
  mono,
}: {
  first: string;
  second: string;
  mono?: boolean;
}) => {
  const t = useI18n();

  return (
    <div className="flex">
  <div className="flex-grow-0 w-full">
    <h2 className="flex flex-col justify-center items-center lg:justify-start lg:items-start uppercase font-semibold lg:pl-6">
      <div className="title_font_up text-[#3f3f46]">
        <ParallaxText direction="right" color={textColor} className="-mb-1">
          <div className="text-[2.68rem] md:text-[2.68rem] lg:text-[3.57rem] xl:text-[4.04rem] 2xl:text-[5.35rem]">
            {t(first as keyof typeof t)}
          </div>
        </ParallaxText>
      </div>
      <div className="title_font lg:pl-22 lg:ml-16 lg:-mt-[3rem]">
        <ParallaxText direction="left" color={textColor}>
          <div
            className={clsx(
              !mono
                ? "bg-gradient-to-b bg-clip-text text-transparent from-[#60c3dc] to-[#504d9b]"
                : "text-[#3f3f46]",
              "text-[2.68rem] md:text-[2.68rem] lg:text-[3.57rem] xl:text-[4.04rem] 2xl:text-[5.35rem]"
            )}
          >
            {t(second as keyof typeof t)}
          </div>
        </ParallaxText>
      </div>
    </h2>
  </div>
</div>

  );
};

// Version 3
export const TitleBartech3 = ({
  first,
  second,
}: {
  first: string;
  second: string;
}) => {
  const t = useI18n();

  return (
    <div className="flex justify-center items-center">
      <div className="flex-grow-0">
        <h2 className="flex flex-col uppercase font-semibold items-center text-center">
          <div className="title_font_dm pt-6 text-[#3f3f46]">
            <ParallaxText direction="left" color={textColor} className="-mb-0.2">
              <div className="
                text-[2.2rem]
                sm:text-[2.4rem]
                md:text-[3rem]
                lg:text-[3.8rem]
                xl:text-[4.8rem]
                2xl:text-[6rem]
              ">
                {t(first as keyof typeof t)}
              </div>
            </ParallaxText>
          </div>

          <div className="title_font lg:-mt-[5rem] sm:-mt-[3rem]">
            <ParallaxText direction="right" color={textColor}>
              <div
                className={clsx(
                  "bg-gradient-to-b bg-clip-text text-transparent from-[#60c3dc] to-[#504d9b]",
                  "text-[3.3rem] sm:text-[3.3rem] md:text-[4.18rem] lg:text-[5.33rem] xl:text-[6.875rem] 2xl:text-[8.8rem]"
                )}
              >
                {t(second as keyof typeof t)}
              </div>
            </ParallaxText>
          </div>
        </h2>
      </div>
    </div>
  );
};

// Version 4
export const TitleBartech4 = ({
  first,
  mono,
}: {
  first: string;
  mono?: boolean;
}) => {
  const t = useI18n();

  return (
    <div className="flex justify-center items-center w-full">
      <h2 className="uppercase font-semibold text-center title_font_dm">
        <ParallaxText direction="right" color={textColor}>
          <span
            className="
              block
              text-[2.4rem]
              sm:text-[2.8rem]
              md:text-[3.2rem]
              lg:text-[3.8rem]
              xl:text-[4.2rem]
              text-[#3f3f46]
              mb-6
            "
          >
            {t(first as keyof typeof t)}
          </span>
        </ParallaxText>
      </h2>
    </div>
  );
};
