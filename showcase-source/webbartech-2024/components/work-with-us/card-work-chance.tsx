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
import Image from "next/image";

export default function CardWorkChance() {
  const t = useI18n();
  const [oportunities, setOportunities] = useState(
    work?.oportunities.map((item) => ({ ...item, isActive: false }))
  );
  return (
    <div className="w-full px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
      <div className="flex justify-center gap-12">
        <SubtitleBartech
          value={t("work.benefits.title")}
          color="dark"
          chars={42}
          isTitle={false}
        />
      </div>
      <div className="flex flex-col gap-8 my-12">
        <div className="relative">
          <Swiper
            pagination={{
              clickable: true,
            }}
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            direction="horizontal"
            autoplay={{
              delay: 4000,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full"
          >
            {benefits.map((item, i) => (
              <SwiperSlide key={i} className={clsx("px-8 !h-[14rem]")}>
                <div className="flex flex-col gap-6 ">
                  <div className="flex justify-center items-center">
                    <div
                      className={clsx(
                        "title_font transition-all duration-200 capitalize",
                        "px-8 py-4 xl:px-12 xl:py-6 text-2xl lg:text-5xl text-gradient-to-b from-[40%] to-[85%] from-[#60c3dc] to-[#504d9b]" 
                      )}
                    >
                      {t(item.title as keyof typeof t)}
                    </div>
                  </div>
                  <div className="flex justify-center normal-case">
                    <p className="text-center text-lg md:text-xl lg:text-2xl xl:text-3xl pb-6">
                      {t(item.description as keyof typeof t)}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-full flex justify-center pt-4">
            <div
              className={clsx(
                "w-screen h-full flex flex-col justify-start items-center gap-4 2xl:gap-6",
                "bg-[#403f46] p-8 lg:px-12 xl:px-16 2xl:px-20 shadow-lg"
              )}
            >
             <Image src={"/images/work/desarrollo-profesional.webp"} alt="desarrollo-profesional.webp" width={1600} height={800} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
