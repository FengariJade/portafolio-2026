"use client";

import {
  esPar,
  separateText,
  splitTextIntoChunks,
} from "@/utils/functions";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import clsx from "clsx";

interface TextProps {
  text: string;
  size: string;
  chars?: number;
}

export const TextDefinition = ({ text, size, chars }: TextProps) => {
  const [lines, setLines] = useState<string[]>(
    splitTextIntoChunks(text, chars ?? 54)
  );
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, { once: false }); // Detecta si el componente está visible
  const { scrollY } = useScroll();

  // Actualiza la posición inicial del scroll cuando el componente entra en el viewport
  useEffect(() => {
    if (isInView) {
      const rectContent = ref.current?.getBoundingClientRect();

      const linesArray = ref.current?.querySelectorAll(".line");
    }
  }, [isInView, scrollY]);

  return (
    <div ref={ref} className="flex">
      <div className="flex-grow-0">
        <p className="flex flex-col normal-case">
          {lines.map((line, i) => (
            <span
              key={`titleOne_${i}`}
              className={clsx(
                size == "md"
                  ? "text-[1.95rem] leading-[2.45rem] sm:text-[2.15rem] sm:leading-[2.35rem] md:text-4xl md:leading-8 lg:text-4xl lg:leading-[2.75rem]"
                  : "text-[1.95rem] leading-[2.45rem] sm:text-[2.15rem] sm:leading-[2.35rem] md:text-4xl md:leading-8 lg:text-2xl lg:leading-[1.75rem]"
              )}
            >
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};
