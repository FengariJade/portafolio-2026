"use client";

import { services } from "@/data/information";
import { useI18n } from "@/locales/client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CardServiceDetail({
  endpoint,
}: {
  endpoint: string;
}) {
  const t = useI18n();
  const data = services.find((item) => item.endpoint === endpoint);

  if (!data) return null;

  return (
    // ⬇️ IMPORTANTE: permitir que sobresalga
    <div className="relative w-full overflow-visible">
      
      {/* SECTION PRINCIPAL */}
      <section className="relative w-full bg-[#42c6df] py-20 pb-48">
        {/* TÍTULO */}
        <div className="flex justify-center mb-16">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold uppercase text-center">
            {t(data.title as keyof typeof t)}
          </h1>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="relative flex justify-center items-center">
            <div className="relative z-10 w-[420px] h-[420px] md:w-[520px] md:h-[520px]">
              <Image
                src={data.cover}
                alt={t(data.title as keyof typeof t)}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* HOTSPOT 1 – ARRIBA DERECHA */}
            <Hotspot
              className="absolute top-[5%] right-[10%]"
              text={t(data.cards[0] as keyof typeof t)}
              align="right"
            />

            {/* HOTSPOT 2 – ARRIBA IZQUIERDA */}
            <Hotspot
              className="absolute top-[20%] left-[8%]"
              text={t(data.cards[1] as keyof typeof t)}
              align="left"
            />

            {/* HOTSPOT 3 – ABAJO IZQUIERDA */}
            <Hotspot
              className="absolute bottom-[25%] left-[6%]"
              text={t(data.cards[2] as keyof typeof t)}
              align="left"
            />

            {/* HOTSPOT 4 – ABAJO DERECHA */}
            <Hotspot
              className="absolute bottom-[20%] right-[8%]"
              text={t(data.cards[3] as keyof typeof t)}
              align="right"
            />
          </div>
        </div>

        {/* COHETE – más grande, centrado y sobresaliendo */}
        <motion.div
           className="absolute -bottom-24 left-24 z-30"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/home/cohete1.webp"
            alt="Cohete"
            width={360}
            height={360}
            className="w-[22rem] md:w-[26rem] object-contain"
            priority
          />
        </motion.div>
      </section>

      {/* TRIÁNGULO INFERIOR */}
      <div
        className="
          absolute
          top-full
          left-0
          w-full
          h-32
          bg-[#42c6df]
          triangle-down
          z-20
        "
      />
    </div>
  );
}



function Hotspot({
  text,
  align,
  className,
}: {
  text: string;
  align: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={`absolute z-20 flex items-center gap-4 ${
        align === "left" ? "flex-row" : "flex-row-reverse"
      } ${className}`}
    >
      {/* TEXTO + LÍNEA */}
      <div
        className={`flex items-center gap-4 ${
          align === "left" ? "flex-row" : "flex-row-reverse text-right"
        }`}
      >
        {/* TEXTO */}
        <p className="max-w-xs text-black text-sm leading-snug font-medium">
          {text}
        </p>

        {/* LÍNEA */}
        <div className="w-16 h-[2px] bg-black" />
      </div>

      {/* PUNTO (SIEMPRE PEGADO A LA IMAGEN) */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
          <div className="w-4 h-4 bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
}

