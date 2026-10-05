"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { figures } from "@/data/information";
import { useI18n } from "@/locales/client";
import { useState } from "react";
import { TitleBartech } from "@/components/title-bartech";
import Image from "next/image";

export const CardAboutFigures = () => {
  const t = useI18n();
  const [figureList, setFigureList] = useState(
    figures.map((item, index) => ({
      ...item,
      index,
      isActive: false,
    }))
  );

  return (
    <section className="relative min-h-screen w-full overflow-visible">
  {/* Fondo */}
  <Image
    src="/images/banner/ourstory.webp"
    alt="Nuestra historia"
    fill
    priority
    className="object-cover z-0"
  />

  {/* Contenido */}
  <div className="relative z-20 min-h-screen px-8 md:px-16 lg:px-24 pt-24 lg:pt-36 ml-6 md:ml-12 lg:ml-20">
    {/* Título */}
    <h2
      className="
        uppercase font-semibold title_font_dm
        text-white
        text-[3rem] md:text-[4rem] lg:text-[5rem]
      "
    >
      nuestra historia
    </h2>

    {/* Burbuja */}
    <div
      className="
        relative
        mt-28
        mb-16
        max-w-3xl
        bg-black
        text-white
        px-16
        py-14
        rounded-tr-[3.5rem]
        rounded-bl-[3.5rem]
      "
    >
      <img
        src="/images/banner/comillas.svg"
        alt="Comillas"
        className="absolute -top-14 -left-[4.75rem] w-28 h-28"
      />

      <p className="uppercase text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-bold leading-[1.05]">
        una frase <br />
        inspiradora
      </p>
    </div>

    <p className="max-w-xl text-black text-lg md:text-xl leading-relaxed">
      Líderes en soluciones tecnológicas personalizadas. Desde Lima, Perú,
      Bartech ha liderado el camino en tecnología por más de 9 años.
    </p>
  </div>
</section>
  );
};
