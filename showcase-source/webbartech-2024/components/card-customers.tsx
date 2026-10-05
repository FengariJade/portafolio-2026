"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  wrap,
} from "framer-motion";
import { TitleBartech3 } from "./title-bartech";
import Image from "next/image";
import { useI18n } from "@/locales/client";
import { figures } from "@/data/information";
import clsx from "clsx";

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    const moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-80, -15, v)}%`);

  return (
    <div className="parallax w-full">
      <motion.div className="scroller flex" style={{ x }}>
        {/* Repetimos el contenido varias veces para crear el efecto infinito */}
        {[...Array(6)].map((_, i) => (
          <span key={i}>{children}</span>
        ))}
      </motion.div>
    </div>
  );
}

export default function CardCustomers() {

  const t = useI18n();
  const [figureList, setFigureList] = useState(
      figures.map((item, index) => ({
        ...item,
        index,
        isActive: false,
      }))
  );

  const clients = [
    "/images/empresa/sernanp.svg",
    "/images/empresa/ingemmet.svg",
    "/images/empresa/osiptel.svg",
    "/images/empresa/rinsa.svg",
    "/images/empresa/TT.svg",
  ];

  const empresa = [
    "/images/empresa/sernanp2.svg",
    "/images/empresa/ingemmet2.svg",
    "/images/empresa/osiptel2.svg",
    "/images/empresa/rinsa2.svg",
    "/images/empresa/tt2.svg",
  ]

  return (
    <div className="flex flex-col justify-center items-center mt-40 relative">
      <TitleBartech3
        first="home.customers.title.first"
        second=""
      />
      <div className="w-full relative pt-40">
        <div className="w-full relative">
          <div className="absolute top-0 left-0 w-full h-[20rem] lg:h-[28rem] -z-10 rounded-none" />

          <div className="w-full relative flex flex-col py-3 lg:py-18">
            <div className="w-full flex justify-center">
              <div className="max-w-6xl flex flex-col space-y-28">
                
                {/* ===== FILA SUPERIOR — CLIENTS (alineadas arriba) ===== */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-20">
                  {clients.map((clientImg, i) => (
                    <div
                      key={`client_${i}`}
                      className="flex justify-center items-start"
                    >
                      <Image
                        src={clientImg}
                        alt={`Cliente ${i}`}
                        width={190}
                        height={190}
                        className={`
                          object-contain
                          ${i === 4
                            ? "w-[4rem] sm:w-[4.5rem] lg:w-[5.5rem]"
                            : "w-[5.5rem] sm:w-[6rem] lg:w-[8.5rem]"
                          }
                        `}
                      />
                    </div>
                  ))}
                </div>

                {/* ===== FILA INFERIOR — EMPRESA (alineadas abajo) ===== */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-20">
                  {empresa.map((empresaImg, i) => (
                    <div
                      key={`empresa_${i}`}
                      className="group flex justify-center items-end"
                    >
                      <div
                        className="
                          w-[180px]
                          h-[180px]

                          bg-gray-400
                          group-hover:bg-[#60C3DC]

                          origin-bottom
                          transition-all
                          duration-300
                          ease-out

                          group-hover:scale-150
                        "
                        style={{
                          maskImage: `url(${empresaImg})`,
                          WebkitMaskImage: `url(${empresaImg})`,
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskPosition: "center",
                          maskSize: "contain",
                          WebkitMaskSize: "contain",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>


          <div
            className="
                relative
                w-full
                h-[750px]
                bg-gradient-to-b
                from-[#60C3DC]
                via-[#60C3DC]
                to-[#414A98]
                mb-10
                overflow-hidden
                flex
                items-center
                justify-center
              "
          >
              <div className="hidden md:flex w-full justify-center">
                <div className="w-full max-w-[90rem] px-16">

                  {/* GRID GENERAL */}
                  <div className="grid grid-rows-2 gap-y-20">

                    {/* ================= FILA 1 ================= */}
                    <div
                      className="
                        grid
                        grid-cols-[14rem_26rem_26rem_14rem]
                        items-center
                        gap-x-10
                      "
                    >
                      {/* TEXTO IZQUIERDA */}
                      <div className="
                        flex
                        items-center
                        justify-end
                        text-right
                        text-white
                        uppercase
                        font-bold
                        leading-tight
                      ">
                        <span className="title_font_dm text-3xl lg:text-4xl">
                          AÑOS DE<br />EXPERIENCIA
                        </span>
                      </div>

                      {/* CARD 1 */}
                      <div className="
                        relative
                        bg-white
                        w-[26rem]
                        h-[17rem]
                        rounded-[2.5rem]
                        shadow-md
                      ">
                        <div className="
                          absolute
                          bottom-6
                          right-8
                          text-black
                          font-bold
                          text-[6rem]
                          leading-none
                          vector_new
                        ">
                          +09
                        </div>
                      </div>

                      {/* CARD 2 */}
                      <div className="
                        relative
                        bg-white
                        w-[26rem]
                        h-[17rem]
                        rounded-[2.5rem]
                        shadow-md
                      ">
                        <div className="
                          absolute
                          bottom-6
                          right-8
                          text-black
                          font-bold
                          text-[6rem]
                          leading-none
                          vector_new
                        ">
                          +50
                        </div>
                      </div>

                      {/* TEXTO DERECHA */}
                      <div className="
                        flex
                        items-center
                        justify-start
                        text-left
                        text-white
                        uppercase
                        font-bold
                        leading-tight
                      ">
                        <span className="title_font_dm text-3xl lg:text-4xl">
                          CLIENTES<br />SATISFECHOS
                        </span>
                      </div>
                    </div>

                    {/* ================= FILA 2 ================= */}
                    <div
                      className="
                        grid
                        grid-cols-[14rem_26rem_26rem_14rem]
                        items-center
                        gap-x-10
                      "
                    >
                      {/* TEXTO IZQUIERDA */}
                      <div className="
                        flex
                        items-center
                        justify-end
                        text-right
                        text-white
                        uppercase
                        font-bold
                        leading-tight
                      ">
                        <span className="title_font_dm text-3xl lg:text-4xl">
                          PROYECTOS<br />EXITOSOS
                        </span>
                      </div>

                      {/* CARD 3 */}
                      <div className="
                        relative
                        bg-white
                        w-[26rem]
                        h-[17rem]
                        rounded-[2.5rem]
                        shadow-md
                      ">
                        <div className="
                          absolute
                          bottom-6
                          right-8
                          text-black
                          font-bold
                          text-[6rem]
                          leading-none
                          vector_new
                        ">
                          +70
                        </div>
                      </div>

                      {/* CARD 4 */}
                      <div className="
                        relative
                        bg-white
                        w-[26rem]
                        h-[17rem]
                        rounded-[2.5rem]
                        shadow-md
                      ">
                        <div className="
                          absolute
                          bottom-6
                          right-8
                          text-black
                          font-bold
                          text-[6rem]
                          leading-none
                          vector_new
                        ">
                          +20
                        </div>
                      </div>

                      {/* TEXTO DERECHA */}
                      <div className="
                        flex
                        items-center
                        justify-start
                        text-left
                        text-white
                        uppercase
                        font-bold
                        leading-tight
                      ">
                        <span className="title_font_dm text-3xl lg:text-4xl">
                          MENTES<br />CREATIVAS
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}