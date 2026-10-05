"use client";

import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "@/styles/swiper.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { CircleScrollProgress } from "@/components/ui/circle";
import { IconRotate } from "@/components/ui/icon-rotate";
import { services } from "@/data/information";
import { useI18n } from "@/locales/client";
import { useEffect, useRef, useState } from "react";
import {
  TitleBartech,
  TitleBartech2,
  TitleBartech3,
} from "@/components/title-bartech";
import { Icon } from "@iconify-icon/react";

export const CardAboutPurpose = () => {
  const t = useI18n();
  const [serviceList, setServiceList] = useState(
    services.map((item, index) => ({
      ...item,
      isActive: false,
      marginLeft: Math.abs(index - services.length / 2),
    }))
  );
  const [rotate, setRotate] = useState(0);
  const ref = useRef(null);

  const [scrollProgress1, setScrollProgress1] = useState(0);
  const [scrollProgress2, setScrollProgress2] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = (ref.current as HTMLElement).getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Cálculo del progreso de scroll
      const startPoint = windowHeight; // Cuando el SVG entra a la pantalla
      const endPoint = windowHeight / 2 - rect.height / 2; // Cuando el centro del SVG está en el centro de la pantalla

      const progress = Math.min(
        Math.max((startPoint - rect.top) / (startPoint - endPoint), 0),
        1 // Ahora permitimos que llegue hasta 1
      );

      setScrollProgress1(progress >= 0.75 ? 1 : 0);
      setScrollProgress2(progress >= 0.95 ? 1 : 0);
    };
    
  }, []);

 return (
  <div className="relative flex flex-col gap-20">

    {/* TEXTO SUPERIOR */}
    <div className="text-center max-w-5xl mx-auto px-6 pt-12 pb-8">
      <p className="text-lg lg:text-2xl">
        Nuestro equipo está compuesto por expertos en diversas disciplinas
        tecnológicas, todos comprometidos con la excelencia e innovación.
      </p>

      <h2 className="mt-12 mb-20 text-4xl lg:text-6xl font-bold">
        RAZONES PARA ELEGIR BARTECH
      </h2>
    </div>

    {/* CONTENIDO PRINCIPAL DESKTOP */}
    <div className="hidden lg:block px-12 xl:px-20 2xl:px-28">
      <div className="flex items-start gap-28">

        {/* COLUMNA IZQUIERDA – ROBOT + BURBUJA */}
        <div className="relative w-[45%] flex justify-start">

        {/* BURBUJA GRANDE */}
        <div className="absolute -top-28 left-0 z-20">
          <div className="relative bg-black text-white px-16 py-16 rounded-[2.5rem] max-w-2xl shadow-2xl">

            <p className="font-extrabold text-4xl lg:text-5xl leading-tight tracking-wide">
              DESCUBRE LO QUE<br />
              NOS INSPIRA Y<br />
              HACIA DÓNDE NOS<br />
              DIRIGIMOS
            </p>

            {/* PUNTA BURBUJA */}
            <div
              className="
                absolute left-1/2 -bottom-10 -translate-x-1/2
                w-0 h-0
                border-l-[36px] border-r-[36px] border-t-[42px]
                border-l-transparent border-r-transparent border-t-black
              "
            />
          </div>
        </div>


         {/* ROBOT */}
          <Image
            src="/images/about/cabezarobot.webp"
            alt="Robot Bartech"
            width={1100}
            height={1100}
            priority
            className="
              mt-56
              scale-125
              translate-y-32
              pointer-events-none
            "
          />

        </div>

       {/* COLUMNA DERECHA – MISIÓN / VISIÓN */}
        <div  className="
          w-[55%]
          flex flex-col
          gap-28
          items-center
          text-center
          -translate-y-12
        ">
          {/* MISIÓN */}
          <div className="max-w-md flex flex-col items-center">
            <Image
              src="/images/about/arribaicon.svg"
              alt="Nuestra Misión"
              width={96}
              height={96}
              className="mb-6"
            />

            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Nuestra Misión
            </h3>

            <p className="text-lg lg:text-xl leading-relaxed text-gray-700 text-left w-full">
              Nuestra misión es impulsar la innovación y la transformación
              digital a través de soluciones tecnológicas de vanguardia.
              Ayudamos a nuestros clientes a alcanzar sus objetivos
              empresariales mediante resultados reales y medibles.
            </p>
          </div>

          {/* VISIÓN */}
          <div className="max-w-md flex flex-col items-center">
            <Image
              src="/images/about/abajoicon.svg"
              alt="Nuestra Visión"
              width={96}
              height={96}
              className="mb-6"
            />

            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Nuestra Visión
            </h3>

            <p className="text-lg lg:text-xl leading-relaxed text-gray-700 text-left w-full">
              Ser reconocidos como líderes en soluciones tecnológicas
              integrales, generando impacto positivo en nuestros clientes
              y la sociedad mediante la excelencia y la innovación constante.
            </p>
          </div>

        </div>
      </div>
    </div>

    {/* MOBILE – SE RESPETA TU SWIPER */}
    <div className="lg:hidden">
      <Swiper
        navigation={true}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        centeredSlides={true}
        loop={true}
        direction="horizontal"
        modules={[Pagination, Navigation]}
        className="!w-full"
      >
        <SwiperSlide className={clsx("scale-swiper", "block")}>
          <div className="h-full flex items-center px-10 sm:px-12">
            <div className="flex flex-col gap-6 text-center">
              <h3 className="font-bold text-3xl">
                {t("about.purpose.items.item_1.title")}
              </h3>
              <p className="text-xl text-justify">
                {t("about.purpose.items.item_1.description")}
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className={clsx("scale-swiper", "block")}>
          <div className="h-full flex items-center px-10 sm:px-12">
            <div className="flex flex-col gap-6 text-center">
              <h3 className="font-bold text-3xl">
                {t("about.purpose.items.item_2.title")}
              </h3>
              <p className="text-xl text-justify">
                {t("about.purpose.items.item_2.description")}
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

  </div>
);
}
