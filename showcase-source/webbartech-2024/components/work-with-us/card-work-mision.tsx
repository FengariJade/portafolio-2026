"use client";

import clsx from "clsx";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

import { CircleScrollProgress } from "@/components/ui/circle";
import { IconRotate } from "@/components/ui/icon-rotate";
import { colors } from "@/utils/constants";
import { services } from "@/data/information";
import { useI18n } from "@/locales/client";
import { useEffect, useRef, useState } from "react";
import { BtnLink } from "@/components/ui/btn-link";
import {
  TitleBartech,
  TitleBartech2,
  TitleBartech3,
} from "@/components/title-bartech";
import { Icon } from "@iconify-icon/react";

export const CardWorkMision = () => {
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

    handleScroll();

  }, []);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="w-full">
        <div className="h-full px-6 md:px-12 lg:px-16 xl:px-20">
          <div className="h-full flex flex-col lg:flex-row gap-6 lg:gap-24">
            <div className="block">
              <div className="h-full flex items-center justify-center lg:justify-start">
                <div
                  ref={ref}
                  className={clsx(
                    "relative",
                    "w-[24rem] h-[24rem] sm:w-[28rem] sm:h-[28rem] md:w-[32rem] md:h-[32rem] lg:w-[38.4rem] lg:h-[38.4rem] xl:w-[48rem] xl:h-[48rem]",
                    `lg:ms-[-6.4rem] xl:-ms-[8rem]`
                  )}
                >
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden z-10">
                    <motion.div
                      initial={{ rotate: rotate }}
                      animate={{ rotate: rotate }}
                      transition={{ duration: 1 }}
                    >
                      <CircleScrollProgress />
                    </motion.div>
                  </div>
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 w-full flex flex-col items-center justify-center">
                    <div className="flex flex-col gap-1 md:gap-2 lg:gap-4">
                      <div className="flex">
                        <div className="flex-grow-0">
                          <h2 className="flex flex-col justify-center items-center lg:items-start title_font_up uppercase font-semibold">
                            <span
                              className={clsx(
                                "text-[1.25rem] md:text-[2rem] xl:text-[3rem]",
                                "leading-[3rem] xl:leading-[4rem]"
                              )}
                            >
                              {t("work.subtitle.first")}
                            </span>
                            <span
                              className={clsx(
                                "text-[1.25rem] md:text-[2rem] xl:text-[3rem]",
                                "leading-[3rem] xl:leading-[4rem]"
                              )}
                            >
                              {t("work.subtitle.second")}
                            </span>
                            <span
                              className={clsx(
                                "text-[1.25rem] md:text-[2rem] xl:text-[3rem]",
                                "leading-[3rem] xl:leading-[4rem]"
                              )}
                            >
                              {t("work.subtitle.third")}
                            </span>
                            <span
                              className={clsx(
                                "text-[1.25rem] md:text-[2rem] xl:text-[3rem]",
                                "leading-[3rem] xl:leading-[4rem]"
                              )}
                            >
                              {t("work.subtitle.fourth")}
                            </span>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="h-full flex flex-col justify-between items-start gap-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}   
                  transition={{ duration: 3.0, delay: 0.3 }}
                  className="flex-grow"
                >
                  <div className="h-full flex items-center gap-8">
                    <div className="hidden lg:flex">
                      <div
                        className={clsx(
                            "w-[6rem] 2xl:w-[10rem] h-[6rem] 2xl:h-[10rem] relative",
                                                  
                            "before:content-[''] before:absolute before:bg-gradient-to-r before:from-25% before:from-[#60c3dc] before:to-[#504d9b]",
                            "before:w-[6rem] 2xl:before:w-[6rem] before:h-[5px] before:rotate-[0deg]",
                            "before:translate-y-20 before:bottom-[6rem] 2xl:before:bottom-[10rem]",
                            "before:-right-[-1.4rem] before:-translate-x-[5.07rem] 2xl:before:-translate-x-[8.45rem]",
                        
                            "after:content-[''] after:absolute after:bg-[#60c3dc]",
                            "after:w-[6rem] 2xl:after:w-[10rem] after:h-[5px] after:rotate-[330deg]",
                            "after:bottom-[6rem] 2xl:after:bottom-[2.7rem] after:translate-y-1/2",
                            "after:-left-[6rem] 2xl:after:-left-[10rem] after:-translate-x-[4.2rem] 2xl:after:-translate-x-[5rem]"
                      )}
                      >
                        <div
                          className={clsx(
                            "w-[6rem] p-4 2xl:w-[10rem] h-[6rem] 2xl:h-[10rem] flex items-center justify-center relative",
                            "before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-[6px] before:border-transparent",
                            "before:bg-gradient-box-to-r before:from-25% before:from-sky-400 before:to-indigo-500 before:mask-box-white before:mask-composite-destination-out"
                          )}
                        >
                          <Image
                            src="/images/contacto/mision.png"
                            alt="about"
                            width={150}
                            height={150}
                            className="w-full p-3"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 2xl:gap-4">
                      <div className="flex justify-center lg:hidden">
                        <div
                          className={clsx(
                            "w-[8rem] 2xl:w-[10rem] h-[8rem] 2xl:h-[10rem] relative"
                          )}
                        >
                          <div
                            className={clsx(
                              "w-[8rem] p-4 2xl:w-[10rem] h-[8rem] 2xl:h-[10rem] flex items-center justify-center relative",
                              "before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-[4px] before:border-transparent",
                              "before:bg-gradient-box-to-r before:from-25% before:from-sky-400 before:to-indigo-500 before:mask-box-white before:mask-composite-destination-out"
                            )}
                          >
                            <Image
                              src="/images/contacto/mision.png"
                              width={150}
                              height={150}
                              alt="our-purpouse.png"
                              className="w-full p-3"
                            />
                          </div>
                        </div>
                      </div>
                      <h3 className="font-bold text-center lg:text-start text-3xl xl:text-4xl 2xl:text-6xl capitalize">
                        {t("work.mision.title")}
                      </h3>
                      <p className="text-xl xl:text-2xl 2xl:text-3xl text-justify">
                        {t("work.mision.description")}
                      </p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}   
                  transition={{ duration: 3.0, delay: 0.3 }}
                  className="flex-grow"
                >
                  <div className="h-full flex items-center gap-8">
                    <div className="hidden lg:flex">
                      <div
                        className={clsx(
                        "w-[6rem] 2xl:w-[10rem] h-[6rem] 2xl:h-[10rem] relative",
                                                  
                        "before:content-[''] before:absolute before:bg-gradient-to-r before:from-25% before:from-[#60c3dc] before:to-[#504d9b]",
                        "before:w-[6rem] 2xl:before:w-[10rem] before:h-[5px] before:rotate-[330deg]",
                        "before:-translate-y-1/2 before:top-[6rem] 2xl:before:top-[10.09rem]",
                        "before:-left-[0rem] 2xl:before:-left-[0rem] before:-translate-x-[5.07rem] 2xl:before:-translate-x-[8.40rem]",
                        
                        "after:content-[''] after:absolute after:bg-[#60c3dc]",
                        "after:w-[6rem] 2xl:after:w-[11.3rem] after:h-[5px]",
                        "after:-translate-y-1/2 after:top-[6rem] 2xl:after:top-[12.55rem]",
                        "after:-left-[6rem] after:-translate-x-[4.2rem] 2xl:after:-left-[12rem] 2xl:after:-translate-x-[7.05rem]"
                      )}
                      >
                        <div
                          className={clsx(
                            "w-[6rem] p-4 2xl:w-[10rem] h-[6rem] 2xl:h-[10rem] flex items-center justify-center relative",
                            "before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-[6px] before:border-transparent",
                            "before:bg-gradient-box-to-r before:from-25% before:from-sky-400 before:to-indigo-500 before:mask-box-white before:mask-composite-destination-out"
                          )}
                        >
                          <Image
                            src="/images/contacto/vision.png"
                            width={150}
                            height={150}
                            alt="vision.png"
                            className="w-full p-2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 2xl:gap-4">
                      <div className="flex justify-center lg:hidden">
                        <div
                          className={clsx(
                            "w-[8rem] 2xl:w-[10rem] h-[8rem] 2xl:h-[10rem] relative"
                          )}
                        >
                          <div
                            className={clsx(
                              "w-[8rem] p-4 2xl:w-[10rem] h-[8rem] 2xl:h-[10rem] flex items-center justify-center relative",
                              "before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-[4px] before:border-transparent",
                              "before:bg-gradient-box-to-r before:from-25% before:from-sky-400 before:to-indigo-500 before:mask-box-white before:mask-composite-destination-out"
                            )}
                          >
                            <Image
                              src="/images/contacto/vision.png"
                              width={150}
                              height={150}
                              alt="vision.png"
                              className="w-full p-2"
                            />
                          </div>
                        </div>
                      </div>
                      <h3 className="font-bold text-center lg:text-start text-3xl xl:text-4xl 2xl:text-6xl capitalize">
                        {t("work.vision.title")}
                      </h3>
                      <p className="text-xl xl:text-2xl 2xl:text-3xl text-justify">
                        {t("work.vision.description")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
