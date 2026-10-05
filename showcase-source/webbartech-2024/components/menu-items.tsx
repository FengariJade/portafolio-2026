"use client";

import { MenuType } from "@/data/information";
import clsx from "clsx";
import Link from "next/link";

import { colors } from "@/utils/constants";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Submenu } from "./submenu-items";
import { motion } from "framer-motion";
import { useCurrentLocale } from "@/locales/client";

export const MenuItems = ({ options }: { options: MenuType[] }) => {
  const [menuOptions, setMenuOptions] = useState(options);
  const pathname = usePathname();
  const locale = useCurrentLocale();
  useEffect(() => {
    setMenuOptions((prev) =>
      prev.map((item) => ({
        ...item,
        isActive:
          item.href === "/"
            ? item.href === pathname
            : pathname.startsWith(item.href),
        isExpand: false,
      }))
    );
  }, [pathname]);
  return (
    <>
      {menuOptions.map((item) => {
        const url = item.href.startsWith("http")
          ? item.href
          : `/${locale}${item.href}`;
        if (!item.children) {
          return (
            <Link href={url} key={item.label}>
              <motion.div
                transition={{ duration: 0.2 }}
                className={clsx(
                  "relative font-medium uppercase px-2 py-1 lg:px-2 lg:py-1.5 xl:px-3 text-sm lg:text-base xl:text-lg hover:bg-sky-200 transition-all duration-300 ease-in-out overflow-hidden",
                  item.isSolid &&
                    `bg-gradient-to-r from-25% text-slate-100 from-[#60c3dc] to-[#504d9b]`
                )}
              >
                {item.isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#60c3dc] to-[#504d9b] mask-box-white mask-composite-destination-out z-0"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <div
                  className={clsx(
                    "relative z-10 h-full flex items-center",
                    item.label === "Contáctanos"
                      ? "text-white"
                      : item.isActive
                      ? "text-slate-100"
                      : "text-slate-900"
                  )}
                >
                  {item.label}
                </div>
              </motion.div>
            </Link>
          );
        } else {
          return (
            <div key={item.label}>
              <Submenu menuItem={item} />
            </div>
          );
        }
      })}
    </>
  );
};
