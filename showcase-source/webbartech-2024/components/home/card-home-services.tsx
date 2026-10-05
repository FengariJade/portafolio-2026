"use client";

import clsx from "clsx";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { CircleScrollProgress } from "../ui/circle";
import { IconRotate } from "../ui/icon-rotate";
import { services } from "@/data/information";
import { useI18n } from "@/locales/client";
import { useState } from "react";
import { BtnLink } from "../ui/btn-link";
import { TitleBartech2 } from "../title-bartech";

import { Swiper, SwiperSlide } from "swiper/react";

import { hover } from "framer-motion";
import { useEffect, useRef } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "@/styles/swiper.css";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { MainCircuitLeftW, MainCircuitRightW } from "../ui/circuits";

export const CardHomeServices = () => {
  const t = useI18n();
  const n = services.length;

  const [serviceList, setServiceList] = useState(
    services.map((item, index) => ({
      ...item,
      isActive: false, // 🔹 todos empiezan cerrados
      marginLeft: Math.abs(
        Math.ceil(n / 2 - Math.max(0, Math.min(index, n - 1 - index)) - 1)
      ),
    }))
  );

  const [rotate, setRotate] = useState(16);

  const activeService = serviceList.find((item) => item.isActive);
  const [isRotating, setIsRotating] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const circleRef = useRef<HTMLDivElement>(null); 

  const [lineCoords, setLineCoords] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);


  useEffect(() => {
    const activeIndex = serviceList.findIndex(item => item.isActive);

    if (activeIndex !== -1 && containerRef.current) {
      const activeEl = containerRef.current.querySelector(
        `#accordion_${activeIndex}`
      );
      const circleEl = containerRef.current.querySelector("#circle");

      if (!activeEl || !circleEl) return;

      const activeRect = activeEl.getBoundingClientRect();
      const circleRect = circleEl.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const startX = circleRect.left + circleRect.width / 2 - containerRect.left;
      const startY = circleRect.top + circleRect.height / 2 - containerRect.top;

      const endX = activeRect.left - containerRect.left;
      const endY = activeRect.top + activeRect.height / 2 - containerRect.top;

      console.log("LINE:", lineCoords);

      setLineCoords({ startX, startY, endX, endY });
      setIsRotating(false);
    } else {
      setLineCoords(null);
      setIsRotating(true);
    }
  }, [serviceList]);


  return (
    <div
      ref={containerRef}
      className="
        relative
        lg:h-screen w-full
        bg-gradient-to-b
        from-[#60C3DC] from-0%
        via-[#60C3DC] via-[90%]
        to-[#414A98] to-[120%]
        mb-10
        overflow-hidden
      "
    >
      {/* Gradiente superior extra */}
      <div
        className="
          pointer-events-none
          absolute
          -top-[20%]
          left-0
          w-full
          h-[30%]
          bg-gradient-to-b
          from-[#414A98]/80
          via-[#414A98]/60
          to-transparent
          z-10
        "
      />


      <div className="h-full">
        <div className="h-full flex flex-col lg:flex-row gap-4">
          {/* Círculo decorativo */}
          <div className="h-full flex items-center justify-center lg:justify-start">
            <div
              className={clsx(
                "relative",
                "w-[24rem] h-[24rem] sm:w-[28rem] sm:h-[28rem] md:w-[32rem] md:h-[32rem] lg:w-[38.4rem] lg:h-[38.4rem] xl:w-[42rem] xl:h-[42rem] 2xl:w-[52rem] 2xl:h-[52rem]",
                `lg:ms-[-6.4rem] xl:-ms-[6.72rem] 2xl:-ms-[8.32rem]`
              )}
            >
              <div
                ref={circleRef}
                id="circle"
                className="
                  absolute
                  top-[57%] left-1/2
                  -translate-x-1/2 -translate-y-1/2
                  w-[23.04rem] h-[23.04rem]
                  sm:w-[34.56rem] sm:h-[34.56rem]
                  lg:w-[66rem] lg:h-[66rem]
                  lg:left-0 lg:translate-x-[-18%] lg:-translate-y-1/2
                  overflow-hidden z-10
                "
              >
               <motion.div
                  animate={{ rotate: isRotating ? 360 : rotate }}
                  transition={
                    isRotating
                      ? { repeat: Infinity, duration: 25, ease: "linear" }
                      : { duration: 0.6, ease: "easeOut" }
                  }
                >
                  <CircleScrollProgress />
                </motion.div>
              </div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 h-full w-full flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <div className="w-full flex items-end justify-start">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Imágenes superpuestas sobre el círculo */}
          <div className="absolute inset-0 z-20 pointer-events-none">

            {/* Imagen principal */}
            <motion.div
              className="absolute top-[55%] left-[15%]"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/home/robot1.webp"
                alt="Overlay 1"
                width={400}
                height={400}
                className="
                  -translate-x-1/2 -translate-y-1/2
                  w-[7rem] sm:w-[9rem] md:w-[11rem] lg:w-[13rem] xl:w-[28rem]
                  object-contain
                "
              />
            </motion.div>

            {/* Imagen secundaria (desfasada) */}
            <motion.div
              className="absolute top-[50%] left-[30%] z-40"
              animate={{ y: [0, 16, 0] }}
              transition={{
                duration: 8,          // más lenta
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,           // desfase
              }}
            >
              <Image
                src="/images/home/cohete1.webp"
                alt="Overlay 2"
                width={200}
                height={200}
                className="
                  -translate-x-1/2 -translate-y-1/2
                  w-[7rem] sm:w-[9rem] md:w-[11rem] lg:w-[20rem]
                  object-contain
                "
              />
            </motion.div>

          </div>


          {/* Lista de servicios */}
          <div className="md:h-full flex flex-col justify-center items-start gap-4 font-medium text-2xl mt-10 lg:mt-20 xl:mt-20">
            <div className="hidden lg:grid lg:grid-cols-1 gap-2 lg:gap-2 xl:gap-4">
              {serviceList.map((item, index) => (
                <div
                  key={`serv_${index}`}
                  className={clsx(
                    "flex flex-col items-start justify-start gap-4",
                    item.marginLeft == 0 && "ms-0",
                    item.marginLeft == 1 && "lg:-ms-2",
                    item.marginLeft == 2 && "lg:-ms-8",
                    item.marginLeft == 3 && "lg:-ms-16",
                    item.marginLeft == 4 && "lg:-ms-28"
                  )}
                >
                <h4
                  id={`accordion_${index}`}
                  className={clsx(
                    "service_option_font flex items-center gap-4 cursor-pointer transition-all duration-300",
                    "px-4 py-2 rounded-full",
                    "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-2xl",
                  item.isActive
                      ? "bg-white shadow-sm"
                      : "bg-transparent text-[#3f3f46] hover:text-[#5c5c5c]"
                  )}
                 onClick={() => {
                  setServiceList(prev => {
                    const updated = prev.map((svc, i) => ({
                      ...svc,
                      isActive: i === index ? !svc.isActive : false,
                    }));

                    console.log(
                      "CLICK → ACTIVE INDEX:",
                      updated.findIndex(s => s.isActive)
                    );

                    return updated;
                  });
                }}

                >
                  {/* 🔹 Punto SOLO cuando NO está activo */}
                  {!item.isActive && (
                    <span
                      className="
                        w-4 h-4
                        rounded-full
                        flex-shrink-0
                        bg-black/70
                        transition-all
                        duration-300
                      "
                    />
                  )}

                  {t(item.title as keyof typeof t)}
                </h4>

              <AnimatePresence initial={false}>
              {item.isActive && (
                <motion.div
                  className="ms-4 sm:ms-6 md:ms-8 lg:ms-10 xl:ms-12 2xl:ms-14 flex flex-col items-start justify-start gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.15, ease: "easeOut" },
                    height: { duration: 0.25, ease: "easeOut" },
                  }}
                >
                  <div className="flex gap-8">
                    <div className="flex-1">
                      <div className="flex flex-col gap-6">
                        <div className="relative w-full flex justify-center px-4">
                          {/* Línea vertical (baja desde el botón) */}
                          <span
                            className="
                              absolute
                              left-[14px]        /* alineada con el punto del h4 */
                              top-[-1.5rem]     /* sube hasta tocar el botón */
                              h-[6.6rem]        /* altura vertical */
                              w-[3px]
                              bg-white
                              rounded-full
                            "
                          />

                          {/* Línea horizontal (entra al texto) */}
                          <span
                            className="
                              absolute
                              left-[14px]
                              top-[5rem]
                              w-11
                              h-[3px]
                              bg-white
                              rounded-full
                            "
                          />

                          {/* Caja blanca del texto */}
                          <div
                            className="
                              relative
                              z-10
                              bg-white
                              rounded-[2rem]
                              px-6 py-4
                              ms-10
                              max-w-[460px] xl:max-w-[520px]

                            "
                          >
                            <p className="text-slate-600 font-normal text-left leading-relaxed text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                              {t(item.description as keyof typeof t)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Swiper para móvil */}
            <div className="flex lg:hidden w-full">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                direction="horizontal"
                autoplay={{
                  delay: 4000,
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
              >
                {serviceList.map((item, i) => (
                  <SwiperSlide key={i} className="block !h-full">
                    <div className="w-full px-12">
                      <div className="w-full !h-[36rem] grid grid-cols-1 gap-2 lg:gap-4 p-8 border rounded-lg">
                        <div className="text-2xl font-semibold text-[#3f3f46]">
                          {t(item.title as keyof typeof t)}
                        </div>
                        <div className="flex-0 w-full flex items-center justify-center">
                          <div className="p-2 w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem]">
                            <Image
                              src={item.icon as string}
                              alt={item.icon as string}
                              width={400}
                              height={400}
                              className="h-full"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-6">
                          <p className="tex-2xl lg:text-base xl:text-lg 2xl:text-xl font-normal text-slate-600 text-justify">
                            {t(item.description as keyof typeof t)}
                          </p>
                          <div className="flex items-center justify-center gap-4">
                            <BtnLink
                              label="label.more"
                              href={`services/${item.endpoint}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden">

            {/* 🔒 CAPA AISLADA (NO SE MUEVE) */}
            <div className="absolute inset-0 pointer-events-none">

              {/* Circuito superior */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64">
                <MainCircuitLeftW />
              </div>

              {/* Circuito lateral */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64">
                <MainCircuitRightW />
              </div>

              {/* Icono */}
              <div className="absolute top-1/2 right-[160px] -translate-y-1/2 z-20 hidden lg:flex">
                <AnimatePresence mode="wait">
                  {activeService && (
                    <motion.div
                      key={activeService.icon}
                      initial={{ opacity: 0, scale: 0.85, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.85, x: 20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="w-[10rem] xl:w-[12rem] 2xl:w-[14rem]"
                    >
                      <Image
                        src={activeService.icon as string}
                        alt={activeService.title as string}
                        width={400}
                        height={400}
                        className="w-full h-auto object-contain"
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>          
        </div>
      </div>
    </div>
  );
};
