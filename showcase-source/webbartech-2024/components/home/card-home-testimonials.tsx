"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify-icon/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "@/styles/swiper.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import clsx from "clsx";
import { useI18n } from "@/locales/client";
import Image from "next/image";
import { testimonials } from "@/data/information";

interface SubtitleProps {
  value: string;
  color?: "light" | "dark";
  className?: string;
}

export const SubtitleBartech: React.FC<SubtitleProps> = ({
  value,
  color = "dark",
  className
}) => {
  const colorClass =
    className?.includes("bg-gradient-to")
      ? ""
      : color === "light"
      ? "text-white"
      : "text-zinc-900";

  return (
    <h2
      className={clsx(
        "font-semibold tracking-tight text-6xl md:text-9xl uppercase",
        colorClass,
        className
      )}
    >
      {value}
    </h2>
  );
};

export const CardHomeTestimonials = () => {
  const t = useI18n();
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="relative lg:h-[48rem]">

    <div className="absolute -top-40 left-1/2 -translate-x-1/2 z-30">
      <SubtitleBartech
        value={t("home.testimonials.title")}
        className={clsx(
          "title_font bg-gradient-to-b from-[40%] to-[85%] from-[#60c3dc] to-[#504d9b] bg-clip-text text-transparent"
        )}
      />
    </div>

      <Swiper
        pagination={{ clickable: true }}
        spaceBetween={30}
        centeredSlides
        loop
        direction="horizontal"
        autoplay={{ delay: 4000 }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="w-full h-[300px] md:h-[500px] relative custom-swiper"
      >
        {testimonials.map((item, i) => (
          <SwiperSlide key={i} className="block">
            <div className="h-full px-8 w-4/5">
              <div
                className={clsx(
                  "relative w-full h-[36rem] lg:h-full flex flex-col justify-start items-center gap-4 2xl:gap-6",
                  "rounded-[2rem] py-8 px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 shadow-lg overflow-hidden",
                  "transition-colors duration-300",
                  "bg-gradient-to-b from-[#3c3b42] to-[#2a2a2e] hover:from-[#4c4b54] hover:to-[#3a3a3f]"
                )}
              >
                {/* Fondo */}
                <div
                  className="absolute -inset-x-10 -inset-y-10 z-0"
                  style={{
                    backgroundImage: `url('/images/home/fondo-testimonials.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                {/* Contenido */}
                <div className="w-full z-10">
                  <div className="grid grid-cols-1 gap-2 lg:gap-4">

                    <div className="grid grid-cols-1 gap-4 lg:gap-8 p-4 lg:p-8 xl:p-12 2xl:p-16">
                      {/* Imagen + Nombre */}
                      <div className="w-full h-full flex flex-col justify-center items-center gap-3">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden ring-4 ring-[#3cdaef] transition-all duration-300 hover:ring-[#66f0ff]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-1 lg:gap-2">
                          <h4 className="text-lg xl:text-3xl font-bold text-[#3cdaef] drop-shadow-lg">
                            {t(item.name as keyof typeof t)}
                          </h4>
                          <p className="text-slate-300 text-sm xl:text-base 2xl:text-xl">
                            {t(item.post as keyof typeof t)}
                          </p>
                        </div>
                      </div>

                      {/* Texto */}
                      <div className="w-full h-full px-2 lg:px-8 flex flex-col justify-center items-center gap-2 lg:gap-4">
                        <div className="flex">
                          <Icon
                            icon="bx:bxs-quote-alt-right"
                            className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-slate-200"
                          />
                        </div>
                        <p className="text-slate-200 text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-justify leading-relaxed">
                          {t(item.description as keyof typeof t)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contador circular en cada tarjeta */}
                
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Estilos extra */}
      <style jsx global>{`
        /* Botones más grandes */
        .custom-swiper .swiper-button-prev,
        .custom-swiper .swiper-button-next {
          width: 60px;
          height: 60px;
          color: white;
        }
        .custom-swiper .swiper-button-prev::after,
        .custom-swiper .swiper-button-next::after {
          font-size: 40px; /* Tamaño del triángulo */
        }
      `}</style>
    </div>
  );
};
