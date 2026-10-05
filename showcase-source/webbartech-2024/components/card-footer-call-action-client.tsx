"use client";

import { motion } from "framer-motion";
import { CircleScrollProgress } from "./ui/circle";
import { TitleBartech2 } from "./title-bartech";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import clsx from "clsx";
import { Provider } from "@/app/[locale]/provider";
import { MainCircuitRight1, MainCircuitRight3 } from "./ui/circuits";
import Image from "next/image";

type Translations = {
  titleFirst: string;
  titleSecond: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  contactUs: string;
};

export const CardFooterCallActionClient = ({
  translations,
  locale,
}: {
  translations: Translations;
  locale: string;
}) => {
  return (
    <section className="relative min-h-screen w-full">
  {/* Imagen de fondo */}
  <Image
    src="/images/banner/nuevobanner.webp"
    alt="Banner Bartech"
    fill
    priority
    className="object-cover"
  />

  {/* ROBOT (imagen superpuesta) */}
  <div
    className="
      absolute
      left-0
      bottom-[-93px]
      z-20
      w-[320px]
      md:w-[500px]
      lg:w-[750px]
      pointer-events-none
    "
  >
    <Image
      src="/images/banner/robotofooter.webp"
      alt="Robot Bartech"
      width={520}
      height={800}
      className="w-full h-auto"
      priority
    />
  </div>

  {/* BOTONES */}
  <div
    className="
      absolute
      top-[65%]
      left-[67%]
      -translate-x-1/2
      -translate-y-1/2
      z-30
      flex gap-4
    "
  >
    <button className="px-8 py-4 bg-white text-black hover:bg-[#38C0E0] hover:text-white font-semibold transition">
      QUIERO MÁS DETALLES
    </button>

    <button className="px-8 py-4 bg-white text-black hover:bg-[#38C0E0] hover:text-white font-semibold transition">
      RESERVAR CITA
    </button>
  </div>
</section>

  );
};
