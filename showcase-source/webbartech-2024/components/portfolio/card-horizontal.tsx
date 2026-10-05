"use client";
import clsx from "clsx";
import { BtnLink, BtnLinkMain } from "../ui/btn-link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Link from "next/link";
import { TitleBartech } from "../title-bartech";
import Image from "next/image";

interface CardHorizontalProps {
  title: string;
  client: string;
  image: string;
  imageCover?: string;
  endpoint: string;
  itemPar: boolean;
  textCenter?: boolean;
  size?: "sm" | "md";
  showCover?: boolean;
}

interface CardProps {
  title?: string;
  client?: string;
  endpoint?: string;
  image?: string;
  textCenter?: boolean;
  position: "start" | "end";
  type: "image" | "title";
  size?: "sm" | "md";
  highlight?: boolean;
}

const Card = ({
  title,
  client,
  endpoint,
  image,
  position,
  type,
  textCenter,
  size,
  highlight,
}: CardProps) => {
  const t = useI18n();
  const locale = useCurrentLocale();
  const posClass = !textCenter
    ? position == "start"
      ? "md:text-start md:justify-start"
      : "md:text-end md:justify-end"
    : "text-center";
  const fontSize =
    size == "sm"
      ? "lg:text-[1rem] lg:leading-[1rem]"
      : "lg:text-[2rem] lg:leading-[2.75rem]";

  return (
    <>
      {type == "title" ? (
        <div className="w-full h-full flex items-center">
          <div className="w-full grid grid-cols-2 lg:grid-cols-1 gap-8 text-default-700">
            <div
              className={clsx(
                position == "end" ? "flex lg:hidden" : "hidden",
                "w-full h-full justify-start items-center m-0"
              )}
            >
              <div>
                <BtnLink
                  href={`portfolio/${endpoint}`}
                  label={t("label.view_project")}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <TitleBartech
                title={t(title as keyof typeof t)}
                chars={16}
                color="#3cdaef"
                direction={position === "start" ? "left" : "right"}
              />
              <p
                className={clsx(
                  "m-0 font-normal text-xl md:text-2xl lg:text-3xl",
                  posClass,
                  fontSize
                )}
              >
                <span className="italic me-2">{t("label.client")}: </span>
                <span className="font-bold capitalize">
                  {t(client as keyof typeof t)}
                </span>
              </p>
            </div>
            <div
              className={clsx(
                "w-full hidden lg:flex m-0",
                !textCenter
                  ? position == "start"
                    ? "md:justify-start"
                    : "md:justify-end"
                  : "md:justify-center"
              )}
            >
              <BtnLinkMain
                href={`portfolio/${endpoint}`}
                label={t("label.view_project")}
                direction={position == "start" ? "left" : "right"}
              />
            </div>
            <div
              className={clsx(
                position == "start" ? "flex lg:hidden" : "hidden",
                "w-full h-full justify-end items-center m-0"
              )}
            >
              <div>
                <BtnLink
                  href={`portfolio/${endpoint}`}
                  label={t("label.view_project")}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={clsx("flex items-center", posClass)}>
          <Link href={`/${locale}/portfolio/${endpoint}`}>
            <Image
              data-hoverable={t("label.view_project")}
              className="object-cover"
              src={image as string}
              width={1800}
              height={1200}
              alt={t(title as keyof typeof t)}
            />
          </Link>
        </div>
      )}
    </>
  );
};

export const CardHorizontal = ({
  title,
  client,
  image,
  imageCover,
  endpoint,
  itemPar,
  textCenter,
  size,
  showCover,
}: CardHorizontalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Animación desde el mismo lado en que se posiciona
  const titleOffset = itemPar ? -100 : 100;
  const imageOffset = itemPar ? 100 : -100;
  const titleRotate = itemPar ? -8 : 8;
  const imageRotate = itemPar ? 8 : -8;

  return (
    <div className="block">
      <div
        ref={ref}
        className={clsx("h-full w-full grid grid-cols-1 lg:grid-cols-7")}
      >
        {/* Título lateral */}
        <motion.div
          initial={{ x: titleOffset, rotate: titleRotate }}
          animate={isInView ? { x: 0, rotate: 0 } : {}}
          transition={{ type: "tween", duration: 0.75, ease: "easeOut" }}
          className={clsx(
            "card-item hidden",
            itemPar
              ? size == "sm"
                ? "lg:flex lg:col-span-2"
                : "lg:flex lg:col-span-3"
              : "lg:hidden"
          )}
        >
          <Card
            position="start"
            type="title"
            title={title}
            client={client}
            endpoint={endpoint}
            textCenter={textCenter}
            size={size}
            highlight={true}
          />
        </motion.div>

        {/* Imagen central */}
        <motion.div
          initial={{ x: imageOffset, rotate: imageRotate }}
          animate={isInView ? { x: 0, rotate: 0 } : {}}
          transition={{ type: "tween", duration: 0.75, ease: "easeOut" }}
          className={clsx(
            "card-item",
            size == "sm" ? "lg:col-span-5" : "lg:col-span-4",
            !itemPar
              ? "ms-[-2rem] lg:ms-[-3rem] xl:ms-[-4rem] 2xl:ms-[-5rem]"
              : "me-[-2rem] lg:me-[-3rem] xl:me-[-4rem] 2xl:me-[-5rem]"
          )}
        >
          <Card
            position={itemPar ? "end" : "start"}
            type="image"
            image={showCover ? imageCover : image}
            title={title}
            endpoint={endpoint}
          />
        </motion.div>

        {/* Título lateral opuesto */}
        <motion.div
          initial={{ x: titleOffset, rotate: titleRotate }}
          animate={isInView ? { x: 0, rotate: 0 } : {}}
          transition={{ type: "tween", duration: 0.75, ease: "easeOut" }}
          className={clsx(
            "card-item hidden",
            !itemPar
              ? size == "sm"
                ? "lg:flex lg:col-span-2"
                : "lg:flex lg:col-span-3"
              : "lg:hidden"
          )}
        >
          <Card
            position="end"
            type="title"
            title={title}
            client={client}
            endpoint={endpoint}
            textCenter={textCenter}
            size={size}
          />
        </motion.div>

        {/* Mobile layout */}
        <motion.div
          initial={{ x: titleOffset, rotate: titleRotate }}
          animate={isInView ? { x: 0, rotate: 0 } : {}}
          transition={{ type: "tween", duration: 0.75, ease: "easeOut" }}
          className="card-item flex lg:hidden"
        >
          <Card
            position={itemPar ? "start" : "end"}
            type="title"
            title={title}
            client={client}
            endpoint={endpoint}
            textCenter={textCenter}
            size={size}
          />
        </motion.div>
      </div>
    </div>
  );
};


