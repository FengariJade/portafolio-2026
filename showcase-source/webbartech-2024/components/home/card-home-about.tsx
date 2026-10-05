"use client";

import { useI18n } from "@/locales/client";
import { TitleBartech4 } from "../title-bartech";
import { BrandBMasked } from "../Brand/brand-b-masked";
import { MainCircuitLeft, MainCircuitRight } from "../ui/circuits";
import { VerticalLine } from "../Brand/vertical-line";
import { TitleBartechH3 } from "../Brand/title-bartech-h3";

export const CardHomeAbout = () => {
  const t = useI18n();

  return (
   <div className="relative w-full overflow-hidden my-20 lg:my-28">

  {/* 🔹 CIRCUITOS – FULL BLEED */}
  <div className="pointer-events-none absolute inset-0 z-0">
    <div className="
      absolute
      top-0
      left-0
      w-[8rem]
      sm:w-[10.5rem]
      md:w-[12.5rem]
      lg:w-[15.5rem]
      xl:w-[16rem]
      2xl:w-[20rem]
    ">
      <MainCircuitLeft />
    </div>

    <div className="
      absolute
      bottom-0
      right-0
      w-[8rem]
      sm:w-[10.5rem]
      md:w-[12.5rem]
      lg:w-[15.5rem]
      xl:w-[16rem]
      2xl:w-[20rem]
    ">
      <MainCircuitRight />
    </div>
  </div>

  {/* 🔹 CONTENIDO CENTRADO */}
  <div className="relative z-10 flex flex-col items-center">

    {/* TÍTULO */}
    <div className="mb-24 lg:mb-32">
      <TitleBartech4 first="home.about.title.first" />
    </div>

    {/* GRID */}
    <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-16 w-full max-w-7xl px-8">
      
      <div className="flex items-center gap-4">
        <VerticalLine />

        <div className="max-w-xl">
          <TitleBartechH3
            text="home.about.title.second"
            className="mb-2"
          />


          <p className="text-base sm:text-lg xl:text-xl leading-relaxed">
            {t("home.about.description.first")}
          </p>
        </div>
      </div>


      <div className="flex justify-center">
        <BrandBMasked className="w-64 sm:w-72 md:w-80 lg:w-96 h-[420px]" />
      </div>

      <div className="flex items-center gap-4">
        <VerticalLine />

        <div className="max-w-xl">
          <TitleBartechH3
            text="home.about.title.third"
            className="mb-2"
          />

          <p className="text-base sm:text-lg xl:text-xl leading-relaxed">
            {t("home.about.description.second")}
          </p>
        </div>
      </div>

    </div>
  </div>
</div>

  );
};
