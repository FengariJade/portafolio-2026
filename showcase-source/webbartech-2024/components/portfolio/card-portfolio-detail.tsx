"use client";

import { TextDefinition } from "@/components/text-definition";
import { Swiper, SwiperSlide } from "swiper/react";

import React, { useRef } from "react";
import { SubtitleBartech } from "@/components/subtitle-bartech";
import { separateText, splitTextIntoChunks } from "@/utils/functions";
import {
  Autoplay,
  EffectCards,
  EffectCoverflow,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useI18n } from "@/locales/client";
import { projects } from "@/data/information";
import clsx from "clsx";
import { Icon } from "@iconify-icon/react";
import { CircleScrollProgress } from "@/components/ui/circle";
import { IconRotate } from "@/components/ui/icon-rotate";
import { TitleBartech2 } from "@/components/title-bartech";
import { MainCircuitLeft, MainCircuitRight } from "@/components/ui/circuits";
import { motion } from "framer-motion";
import Image from "next/image";

export const CardPortfolioDetail = ({ endpoint }: { endpoint: string }) => {
  const t = useI18n();

  const data = projects.find((item) => item.endpoint === endpoint);

  const [lines, setLines] = React.useState<string[]>(
    splitTextIntoChunks(t(data?.tag as keyof typeof t), 30, true).map((line) =>
      line.toLowerCase()
    )
  );

  const itemsTech = [
    {
      label: t("label.client"),
      value: t(data?.client as keyof typeof t),
    },
    {
      label: t("label.technologies"),
      value: t(data?.technologies as keyof typeof t),
    },
    {
      label: t("label.years"),
      value: t(data?.years as keyof typeof t),
    },
  ];

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    if (progressCircle.current && progressContent.current) {
      (progressCircle.current as HTMLElement).style.setProperty(
        "--progress",
        `${1 - progress}`
      );
      (progressContent.current as HTMLElement).textContent = `${Math.ceil(
        time / 1000
      )}s`;
    }
  };
  return (
    <div className="grid grid-cols-1 gap-4">
      <section
        className="w-screen lg:h-screen bg_animated"
        style={{
          //backgroundImage: `url(${data?.backgroundImage})`,
          background: `linear-gradient(
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0.25) ),
          url(${data?.backgroundImage}) no-repeat center center`,
        }}
      >
        <div className="w-full h-full p-8 lg:p-12 xl:p-16 2xl:p-20">
          <div className="w-full h-full flex flex-col justify-between items-center gap-16 ">
            <div className="h-16"></div>
            <h1
              className={clsx(
                "py-1 text-slate-100 uppercase animate-liftUp font-medium text-center title_font",
                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
              )}
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              {lines.map((line, i) => (
                <span key={`line${i}`}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>
            <div className="w-full flex flex-wrap justify-center items-center gap-2 lg:gap-8 xl:gap-12 2xl:gap-32">
              {itemsTech.map((item, i) => (
                <div
                  key={`itemTech${i}`}
                  className="flex flex-col gap-1 justify-center items-center text-center"
                >
                  <p
                    className="text-sm sm:text-base md:text-lg lg:text-2xl text-slate-100 capitalize"
                    style={{
                      textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    className={clsx(
                      "text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-slate-100 font-medium border-2 border-slate-100 rounded-full px-2 py-1 sm:px-4 sm:py-2",
                      i === 0 && "uppercase"
                    )}
                    style={{
                      textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {t(item.value as keyof typeof t)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full p-8 lg:p-12 xl:p-16 2xl:p-20">
        <div className="flex flex-col gap-12">
          <div className="flex justify-center lg:justify-start">
            <SubtitleBartech
              value={t("label.techUsed")}
              color="dark"
              chars={12}
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-flow-col lg:auto-cols-fr justify-center gap-y-8 gap-x-12 lg:gap-y-12 lg:gap-x-16">
            {data?.techUsed.map((item, i) => (
              <div
                key={`techUsed${i}`}
                className="flex flex-col justify-start items-center gap-2 lg:gap-4"
              >
                <div className="flex flex-col justify-center items-center gap-1">
                  <Image
                    src={item.icon}
                    alt={item.icon}
                    width={72}
                    height={72}
                    className="w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20"
                  />
                  <h3 className="text-center text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold tracking-tight text-slate-700">
                    {t(item.name as keyof typeof t)}
                  </h3>
                </div>
                <p className="mt-2 text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-slate-500 text-justify">
                  {t(item.description as keyof typeof t)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full p-8 lg:p-12 xl:p-16 2xl:p-20">
        <div className="flex flex-col justify-center gap-12">
          <div className="w-full">
            <Image
              src={data?.imagePortfolio as string}
              alt={data?.imagePortfolio as string}
              width={2000}
              height={1000}
              className="w-full rounded-tr-[3rem] sm:rounded-tr-[4rem] md:rounded-tr-[5rem] lg:rounded-tr-[6rem] xl:rounded-tr-[7rem] 2xl:rounded-tr-[8rem] rounded-bl-[3rem] sm:rounded-bl-[4rem] md:rounded-bl-[5rem] lg:rounded-bl-[6rem] xl:rounded-bl-[7rem] 2xl:rounded-bl-[8rem] shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="w-full px-8 lg:px-12 xl:p-16 2xl:p-20">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-16">
            <div className="flex items-center justify-center lg:justify-start">
              <div
                className={clsx(
                  "relative block",
                  "w-[24rem] h-[24rem] sm:w-[28rem] sm:h-[28rem] md:w-[32rem] md:h-[32rem] lg:w-[38.4rem] lg:h-[38.4rem] xl:w-[42rem] xl:h-[42rem] 2xl:w-[52rem] 2xl:h-[52rem]",
                  `lg:ms-[-6.4rem] xl:-ms-[6.72rem] 2xl:-ms-[8.32rem]`
                )}
              >
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full overflow-hidden z-10">
                  <motion.div 
                      className="scale-x-[-1]"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 25,
                        ease: "linear",
                      }}>
                    <CircleScrollProgress />
                  </motion.div>
                </div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 h-full w-full flex flex-col items-center justify-center">
                  <div className="flex flex-col gap-2 lg:gap-4">
                    <TitleBartech2
                      first="label.aboutSystem.first"
                      second="label.aboutSystem.second"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="block">
              <div className="h-full flex flex-col justify-center items-center gap-8 font-medium">
                <p
                  className={clsx(
                    "text-slate-700 text-justify",
                    "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
                  )}
                >
                  {t(data?.aboutSystem1 as keyof typeof t)}
                </p>
                <p
                  className={clsx(
                    "text-slate-700 text-justify",
                    "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
                  )}
                >
                  {t(data?.aboutSystem2 as keyof typeof t)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full p-8 lg:p-12 xl:p-16 2xl:p-20">
        <div className="px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 flex justify-center items-center gap-8">
          <div className="w-full">
            {data?.imageResponsive.length == 1 ? (
              <Image
                src={data?.imageResponsive[0] as string}
                alt={data?.imageResponsive[0] as string}
                width={1200}
                height={1800}
                quality={72}
                className="w-full"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-7 gap-12 md:gap-24">
                <div className="md:col-span-5 md:px-12">
                  <Image
                    src={data?.imageResponsive[0] as string}
                    alt={data?.imageResponsive[0] as string}
                    width={1200}
                    height={1800}
                    quality={72}
                    className="w-full md:rotate-[-10deg]"
                  />
                </div>
                <div className="md:col-span-2 md:px-4">
                  <Image
                    src={data?.imageResponsive[1] as string}
                    alt={data?.imageResponsive[1] as string}
                    width={1200}
                    height={1800}
                    quality={72}
                    className="w-full md:rotate-[10deg]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="w-full p-8 lg:p-12 xl:p-16 2xl:p-20">
        <div className="flex flex-col gap-8 md:gap-16">
          <div className="flex items-center">
            <SubtitleBartech value={t("label.devProcess")} color="dark" />
          </div>

          <div className="w-full">
            <Swiper
              navigation={true}
              slidesPerView={1}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              centeredSlides={true}
              loop={true}
              direction="horizontal"
              autoplay={{
                delay: 4000,
              }}
              breakpoints={{
                1280: {
                  slidesPerView: 3, // 2 slides visibles en pantallas medianas
                  spaceBetween: 5,
                },
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="!w-full"
            >
              {data?.listProcess.map((item, i) => (
                <SwiperSlide key={i} className={clsx("scale-swiper", "block")}>
                  <div className="w-full h-[24rem] xl:h-[42rem]">
                    <div
                      className={clsx("w-full flex flex-col gap-6 px-8")}
                    >
                      <div className="grow"></div>
                      <div className="w-full flex-0 h-auto 2xl:px-8">
                        <div className="grid grid-cols-1 gap-4 border-2 bg-[#403f46] 2xl:px-4 py-8 rounded-[2rem]">
                          <div className="grid grid-cols-1 gap-4 p-4 xl:p-8">
                            <div className="flex justify-center">
                              <Image
                                src={item.icon as string}
                                width={100}
                                height={100}
                                alt="our-purpouse.png"
                                className="object-cover object-center w-[4rem] h-[4rem] lg:w-[8rem] lg:h-[8rem]"
                              />
                            </div>
                            <h4 className="text-slate-100 font-bold text-xl md:text-2xl lg:text-2xl xl:text-3xl text-center lg:h-[4rem]">
                              {t(item.title as keyof typeof t)}
                            </h4>
                            <p className="text-slate-100 text-lg md:text-xl xl:text-2xl font-light text-justify">
                              {t(item.description as keyof typeof t)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="relative h-[10.65rem] sm:h-[14rem] md:h-[17rem] lg:h-[21rem] xl:h-[22.5rem] 2xl:h-[27rem]">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="flex items-center justify-between h-full w-full">
              <div className="w-[8rem] sm:w-[10.5rem] md:w-[12.5rem] lg:w-[15.5rem] xl:w-[16rem] 2xl:w-[20rem]">
                <MainCircuitLeft />
              </div>
              <div className="w-[8rem] sm:w-[10.5rem] md:w-[12.5rem] lg:w-[15.5rem] xl:w-[16rem] 2xl:w-[20rem]">
                <MainCircuitRight />
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 h-full w-full">
            <div className="flex flex-col justify-center items-center h-full w-full">
              <div className="flex justify-center items-center h-full">
                <h3 className="text-center font-medium uppercase title_font flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scaleY: 1, filter: "blur(0)" }}
                    transition={{ duration: 0.75, delay: 0.5 }}
                    style={{
                      originY: 1,
                    }}
                    className={clsx(
                      "text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] xl:text-[6rem] 2xl:text-[7rem]",
                      "leading-[2.8125rem] sm:leading-[3.75rem] md:leading-[4.6875rem] lg:leading-[5.625rem] xl:leading-[7.5rem] 2xl:leading-[8.75rem]",
                      "text-slate-700"
                    )}
                  >
                    {t(data?.subtitle_2 as keyof typeof t)}
                  </motion.div>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
          <div className="w-full xl:max-w-[86rem]">
            {data?.more.map((item, i) => (
              <div
                key={`more_${i}`}
                className={clsx(
                  "flex items-center w-full",
                  i == 0 && "justify-start",
                  i == 1 &&
                    "justify-end lg:my-[-4rem] xl:my-[-8rem] 2xl:my-[-16rem]",
                  i == 2 && "justify-start"
                )}
              >
                <div
                  className={clsx(
                    "relative",
                    "w-[27.5rem] h-[27.5rem] md:w-[36rem] md:h-[36rem] lg:w-[38.4rem] lg:h-[38.4rem] xl:w-[48rem] xl:h-[48rem]"
                  )}
                >
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden z-10">
                    <motion.div 
                        className="scale-x-[-1]"
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 25,
                          ease: "linear",
                        }}>
                      <CircleScrollProgress />
                    </motion.div>
                  </div>
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 h-full w-full flex flex-col items-center justify-center">
                    <div className="h-full flex flex-col items-center justify-center gap-2 md:gap-4 px-8 md:px-16">
                      <div className="flex justify-center">
                        <Image
                          src={item.icon as string}
                          width={100}
                          height={100}
                          alt="our-purpouse.png"
                          className="object-cover object-center w-[3rem] h-[3rem] lg:w-[8rem] lg:h-[8rem]"
                        />
                      </div>
                      <h3 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium uppercase title_font w-full text-center">
                        {item.title}
                      </h3>
                      <div className="w-full text-center text-base lg:text-xl xl:text-2xl 2xl:text-3xl px-4">
                        {item.description}
                      </div>
                     {
                      item.isList && ( 
                      <ul className="w-full text-center text-base lg:text-xl xl:text-2xl 2xl:text-3xl px-4">
                        {item.items.map((op,i)=>(
                          <li key={`op_${i}`}>
                            {op}
                          </li>
                        ))}
                      </ul>)
                     }
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-4 lg:py-20">
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
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="w-full relative"
          >
            {data?.captures.map((item, i) => (
              <SwiperSlide key={i} className={clsx("block px-[1.5rem]")}>
                <div className="w-full h-full p-4">
                  <Image
                    src={item.image}
                    alt={item.image}
                    width={1600}
                    height={1200}
                    className={clsx(
                      "w-full h-full object-cover object-center border-1 border-slate-300 shadow-lg",
                      "rounded-tr-[3rem] sm:rounded-tr-[4rem] md:rounded-tr-[5rem] lg:rounded-tr-[6rem] xl:rounded-tr-[7rem] 2xl:rounded-tr-[8rem] rounded-bl-[3rem] sm:rounded-bl-[4rem] md:rounded-bl-[5rem] lg:rounded-bl-[6rem] xl:rounded-bl-[7rem] 2xl:rounded-bl-[8rem]"
                    )}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};
