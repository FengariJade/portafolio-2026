"use client";

import { benefits, work } from "@/data/information";
import { useI18n } from "@/locales/client";
import { Icon } from "@iconify-icon/react";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "@/styles/swiper.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import clsx from "clsx";
import { useState } from "react";
import { SubtitleBartech } from "../subtitle-bartech";
import { Button } from "@nextui-org/react";
import { FormOportunity } from "./form-oportunity";
import { motion } from "framer-motion";
import Image from "next/image";


export default function CardWorkOportunities() {
  const t = useI18n();
  const [oportunities, setOportunities] = useState(
    work?.oportunities.map((item) => ({ ...item, isActive: false }))
  );
  return (
    <div className="w-full px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
      <div className="grid grid-cols-1 gap-6">
        <div className="relative w-full bg-slate-100 overflow-visible">

          {/* COHETE — SALE HACIA LA SECCIÓN SUPERIOR */}
          <motion.div
            className="
              absolute
              -top-40
              left-8
              z-30
            "
            animate={{ y: [0, 18, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/home/cohete1.webp"
              alt="Cohete"
              width={360}
              height={360}
              className="
                w-[12rem]
                md:w-[14rem]
                lg:w-[16rem]
                object-contain
              "
              priority
            />
          </motion.div>

          {/* CONTENIDO */}
          <div className="flex flex-col items-center text-center px-6 pt-32 pb-24 gap-8">

            <h2 className="uppercase font-extrabold text-4xl md:text-5xl lg:text-6xl text-black">
              OPORTUNIDADES ACTUALES
            </h2>

            <div className="flex justify-center normal-case px-12 py-6 md:py-16">
                <p className="text-center text-lg md:text-xl lg:text-2xl xl:text-3xl">
                  {t("work.opportunities.description")}
                </p>
            </div>

          </div>
        </div>

        <div>
          {oportunities.map((op, index) => (
            <div key={index}>
              <h3>
                <div
                  className={clsx(
                    "flex items-center justify-between w-full px-6 py-4 gap-3 text-xl border-b-2 border-slate-300",
                    "text-slate-700"
                  )}
                >
                  <div className="flex flex-col justify-start items-start gap-4">
                    <div className="h-[3.5rem] flex gap-4 justify-center items-center">

                        <Image
                          src={
                            op.isActive
                              ? "/icons/newWork/focoEncendido.svg"
                              : "/icons/newWork/focoApagado.svg"
                          }
                          alt=""
                          width={28}
                          height={28}
                          className="shrink-0 transition-opacity duration-200"
                        />


                      <h4 className="font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">
                        {t(op.title as keyof typeof t)}
                      </h4>
                      <Button
                        isIconOnly
                        aria-label="Like"
                        size="sm"
                        variant="light"
                        color="default"
                        onPress={() =>
                          setOportunities((prev) =>
                            prev.map((item, i) => ({
                              ...item,
                              isActive: index === i ? !item.isActive : false,
                            }))
                          )
                        }
                      >
                        {op.isActive ? (
                          <Icon
                            icon="mdi:chevron-up"
                            className="text-slate-700 text-2xl"
                          />
                        ) : (
                          <Icon
                            icon="mdi:chevron-down"
                            className="text-slate-700 text-2xl"
                          />
                        )}
                      </Button>
                    </div>
                    <div className={clsx(op.isActive ? "block" : "hidden")}>
                      <div className="px-8 py-2 flex flex-col gap-4">
                        <p className="text-slate-700 font-normal 2xl:text-2xl">
                          {t(op.description as keyof typeof t)}
                        </p>
                        <p className="text-slate-700 font-normal 2xl:text-2xl">
                          Funciones:
                        </p>
                        <ul className="ps-16">
                          {op.funciones.map((item, i) => (
                            <li
                              key={`fnc_${i}`}
                              className="2xl:text-2xl list-disc"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <FormOportunity key={`form_${index}`} cargo={op.title} />
                </div>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
