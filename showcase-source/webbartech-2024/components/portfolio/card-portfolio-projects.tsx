"use client";

import Image from "next/image";
import { projects } from "@/data/information";
import { CardHorizontal } from "./card-horizontal";
import { esPar } from "@/utils/functions";
import { BtnLinkMain } from "../ui/btn-link";
import { useI18n, useCurrentLocale } from "@/locales/client";
import clsx from "clsx";

export default function CardPortfolioProjects() {
  const t = useI18n();
  const locale = useCurrentLocale();

  return (
    <div className="w-full py-24">
  {/* MOBILE (SIN CAMBIOS) */}
  <div className="flex flex-col gap-12 lg:hidden">
    {projects.map((item, i) => (
      <CardHorizontal
        key={`proj_mobile_${i}`}
        {...item}
        itemPar={esPar(i)}
      />
    ))}
  </div>


  {/* DESKTOP CONTENT */}
  <div className="hidden lg:block">
    {/* GRID */}
    <div className="grid grid-cols-2 gap-x-28 gap-y-32 max-w-[1400px] mx-auto px-12 xl:px-0">
      {projects.slice(0, 3).map((item, i) => {
        const alignRight = i % 2 === 1;

        return (
          <div
            key={`proj_desktop_${i}`}
            className={clsx(
              "flex flex-col",
              alignRight ? "items-end text-right" : "items-start text-left"
            )}
          >
            {/* TÍTULO */}
            <h3
              className="
                uppercase title_font_dm
                text-transparent bg-clip-text
                bg-gradient-to-r from-[#60c3dc] to-[#504d9b]
                text-5xl xl:text-6xl
                min-h-[5.5rem] xl:min-h-[6.5rem]
                flex items-end
              "
            >
              {t(item.title as any, {})}
            </h3>

            {/* CLIENTE */}
            <p className="mt-1 text-base xl:text-lg text-default-500">
              {t("label.client")}:{" "}
              <span className="font-medium">
                {t(item.client as any, {})}
              </span>
            </p>

            {/* IMAGEN + BOTÓN */}
            <div className="mt-24 flex flex-col items-center">
              <div className="relative w-[85%] xl:w-[75%]">
                <Image
                  src={item.image}
                  alt={t(item.title as any, {})}
                  width={1200}
                  height={900}
                  className="object-contain"
                  priority={i === 0}
                />
              </div>

              <div className="mt-10">
                <a
                  href={`/${locale}/portfolio/${item.endpoint}`}
                  className="group inline-block"
                >
                  <span className="block rounded bg-gradient-to-r from-[#60c3dc] to-[#504d9b] p-[1px]">
                    <span
                      className="
                        flex items-center justify-center
                        px-10 py-3
                        font-medium uppercase tracking-wide
                        text-[#60c3dc]
                        bg-slate-100
                        rounded
                        transition-all duration-300
                        group-hover:bg-gradient-to-r
                        group-hover:from-[#60c3dc]
                        group-hover:to-[#504d9b]
                        group-hover:text-white
                      "
                    >
                      {t("label.view_project")}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        );
      })}
      </div>
      {/*  ROBOT */}
      <div className="relative mt-32">
        <div className="w-screen h-px bg-black/80" />

        <div className="absolute bottom-0 right-8 xl:right-16">
        <Image
            src="/images/portfolio/newP/RobotPortafolio.webp"
            alt="Robot Portfolio"
            width={900}
            height={1100}
            className="
              object-contain
              w-[32rem]
              xl:w-[38rem]
              2xl:w-[44rem]
            "
            priority
          />
        </div>
      </div>
    </div>
  </div>
  );
}
