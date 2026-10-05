"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

/* ===================== */
/* TIMELINE ITEM */
/* ===================== */
const TimelineItem = ({
  title,
  text,
  reverse,
  icon,
}: {
  title: string;
  text: string;
  reverse?: boolean;
  icon: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-24 min-h-[15rem]">
      {/* IZQUIERDA */}
      <div className="flex justify-end">
        {!reverse ? (
          <h3 className="uppercase font-extrabold text-5xl xl:text-6xl text-black max-w-[28rem] text-right">
            {title}
          </h3>
        ) : (
          <div className="bg-white rounded-2xl px-10 py-8 max-w-[28rem]">
            <p className="text-xl text-gray-700">{text}</p>
          </div>
        )}
      </div>

      {/* CENTRO */}
      <div className="relative flex justify-center h-full">
        <div className="absolute top-0 h-full w-[2px] bg-white" />
        <div className="relative z-10 w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg mt-16">
          {icon}
        </div>
      </div>

      {/* DERECHA */}
      <div className="flex justify-start">
        {!reverse ? (
          <div className="bg-white rounded-2xl px-10 py-8 max-w-[28rem]">
            <p className="text-xl text-gray-700">{text}</p>
          </div>
        ) : (
          <h3 className="uppercase font-extrabold text-5xl xl:text-6xl text-black max-w-[28rem] text-left">
            {title}
          </h3>
        )}
      </div>
    </div>
  );
};

/* ===================== */
/* MAIN */
/* ===================== */
export const CardWorkMain = () => {
  return (
    <div className="relative bg-[#42C2E0] overflow-hidden">

      {/* ===================== */}
      {/* LÍNEA CONTINUA GLOBAL */}
      {/* ===================== */}
      <div className="absolute left-1/2 top-0 bottom-[9rem] w-[2px] bg-white -translate-x-1/2 z-0" />

      {/* ===================== */}
      {/* BANNER */}
      {/* ===================== */}
      <div className="relative min-h-screen flex flex-col items-center justify-center gap-10 px-6 text-center z-10">

        {/* MÁSCARA SUPERIOR (tapa línea sobre título) */}
        <div className="absolute left-1/2 top-0 h-[45%] w-[6rem] bg-[#42C2E0] -translate-x-1/2 z-10" />

        {/* TÍTULO */}
        <div className="relative z-20 bg-white rounded-full px-16 py-6">
          <h2 className="uppercase font-extrabold text-4xl md:text-5xl lg:text-6xl text-black">
            ÚNETE A NUESTRO EQUIPO
          </h2>
        </div>

        {/* MÁSCARA SUBTÍTULO */}
        <div className="absolute left-1/2 top-[55%] h-[6rem] w-[6rem] bg-[#42C2E0] -translate-x-1/2 z-10" />

        {/* SUBTÍTULO */}
        <p className="relative z-20 mt-8 text-white text-xl md:text-2xl max-w-3xl">
          En Bartech, valoramos el talento, la creatividad y el compromiso.
          ¡Queremos que seas parte de nuestro crecimiento!
        </p>
      </div>

      {/* ===================== */}
      {/* COHETE */}
      {/* ===================== */}
      <motion.div
        className="absolute top-[12%] right-[6%] z-30"
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/home/cohete1.webp"
          alt="Cohete"
          width={420}
          height={420}
          className="scale-x-[-1] w-[22rem] object-contain"
          priority
        />
      </motion.div>

      {/* ===================== */}
      {/* TIMELINE */}
      {/* ===================== */}
      <div className="relative max-w-7xl mx-auto flex flex-col gap-44 py-32 px-6 z-10">
        <TimelineItem
          title="DESARROLLO PROFESIONAL"
          text="Lorem ipsum dolor sit amet, consectetur."
          icon={<Image src="/icons/newWork/timeline1.svg" alt="" width={46} height={46} />}
        />

        <TimelineItem
          title="AMBIENTE COLABORATIVO"
          text="Lorem ipsum dolor sit amet, consectetur."
          reverse
          icon={<Image src="/icons/newWork/timeline2.svg" alt="" width={46} height={46} />}
        />

        <TimelineItem
          title="INNOVACIÓN"
          text="Lorem ipsum dolor sit amet, consectetur."
          icon={<Image src="/icons/newWork/timeline3.svg" alt="" width={46} height={46} />}
        />

        <TimelineItem
          title="CRECIMIENTO"
          text="Lorem ipsum dolor sit amet, consectetur."
          reverse
          icon={<Image src="/icons/newWork/timeline4.svg" alt="" width={46} height={46} />}
        />

        <div className="relative">
          {/* máscara inferior para cortar la línea */}
          <div className="absolute left-1/2 bottom-0 h-1/2 w-[6rem] bg-[#42C2E0] -translate-x-1/2 z-10" />

          <TimelineItem
            title="EQUIPO HUMANO"
            text="Lorem ipsum dolor sit amet, consectetur."
            icon={<Image src="/icons/newWork/timeline5.svg" alt="" width={46} height={46} />}
          />
        </div>

      </div>
    </div>
  );
};
