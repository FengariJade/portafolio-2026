"use client";
import { MenuType } from "@/data/information";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useCurrentLocale } from "@/locales/client";

export const Submenu = ({ menuItem }: { menuItem: MenuType }) => {
  const [isExpand, setIsExpand] = useState(false);
  const locale = useCurrentLocale();

  return (
    <div
      className="hidden lg:block relative"
      onMouseEnter={() => setIsExpand(true)}
      onMouseLeave={() => setIsExpand(false)}
    >
      {/* BOTÓN */}
      <button
        className={clsx(
          "relative font-semibold uppercase px-4 py-2 text-sm lg:text-base xl:text-lg transition-colors duration-300",
          isExpand || menuItem.isActive
            ? "text-sky-600 before:absolute before:inset-0 before:border before:border-sky-400"
            : "text-slate-800 hover:text-sky-600"
        )}
      >
        {menuItem.label}
      </button>

      {/* SUBMENU */}
      <div
        className={clsx(
          "absolute left-1/2 -translate-x-1/2 top-full pt-2 z-20",
          "transition-all duration-300 ease-out",
          isExpand
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div
          className="
            w-[18rem]
            rounded-2xl
            bg-slate-900/90
            backdrop-blur-xl
            shadow-2xl
            px-6 py-4
          "
        >
          <ul className="flex flex-col divide-y divide-slate-600/40">
            {menuItem.children?.map((child) => (
              <li key={child.label}>
                <Link
                  href={`/${locale}${child.href}`}
                  className="
                    block py-4
                    text-center
                    text-sm lg:text-base
                    text-slate-100
                    transition-colors duration-300
                    hover:text-sky-400
                  "
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
