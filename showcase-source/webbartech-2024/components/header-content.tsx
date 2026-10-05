"use client";

import Link from "next/link";
import { Logo } from "./icons";
import { MenuItems } from "./menu-items";
import { MenuType } from "@/data/information";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify-icon/react";
import { useCurrentLocale } from "@/locales/client";
import { AnimatePresence, motion } from "framer-motion";

export const HeaderContent = ({ menuOptions }: { menuOptions: MenuType[] }) => {
  const locale = useCurrentLocale();

  const [activeMobile, setActiveMobile] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [itemSelected, setItemSelected] = useState<MenuType | undefined>();
  const [isScrolled, setIsScrolled] = useState(false);

  // 👉 División del menú
  const centerTopMenu = menuOptions.slice(0, 3);
  const centerBottomMenu = menuOptions.slice(3, 6);
  const rightMenu = menuOptions.slice(6, 7);

  // 👉 Scroll detector
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleActiveMobile = () => {
    setActiveMobile((prev) => !prev);
    handleCloseSubmenu();
  };

  const handleSelectedSubmenu = (item: MenuType) => {
    setIsExpand(true);
    setItemSelected(item);
  };

  const handleCloseSubmenu = () => {
    setIsExpand(false);
    setItemSelected(undefined);
  };

  // 👉 CONTENEDOR CENTRAL REUTILIZABLE
  const CENTER_CONTAINER =
    "max-w-[1536px] mx-auto px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20";

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50",
          "bg-slate-100 transition-all duration-300",
          "h-[4rem] lg:h-[4.5rem]"
        )}
      >
        <div className="w-full h-full">
          <div
            className={clsx(
              "flex items-center justify-between h-full",
              CENTER_CONTAINER
            )}
          >
            {/* LOGO */}
            <Link href={`/${locale}`}>
              <Logo className="h-6 lg:h-8 text-slate-700 transition-all" />
            </Link>

            {/* ===== DESKTOP MENU ===== */}
            <div className="hidden lg:flex flex-1 relative">
              <motion.div layout className="flex items-center w-full">
                {/* CENTRO */}
                <div className="flex-1 flex justify-center">
                  <div className="inline-flex items-center gap-8">
                    <MenuItems options={centerTopMenu} />
                    {isScrolled && <MenuItems options={centerBottomMenu} />}
                  </div>
                </div>

                {/* DERECHA */}
                <div className="flex items-center">
                  <MenuItems options={rightMenu} />
                </div>
              </motion.div>
            </div>

            {/* ===== MOBILE BUTTON ===== */}
            <div className="flex lg:hidden">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="text-slate-700"
                onPress={handleActiveMobile}
              >
                <Icon
                  icon={activeMobile ? "bx:x" : "bx:menu"}
                  className="text-2xl"
                />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= BOTTOM MENU ================= */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block fixed bottom-10 left-0 right-0 z-40"
          >
            <div className={CENTER_CONTAINER}>
              <div className="flex justify-center">
                <div className="inline-flex gap-12">
                  <MenuItems options={centerBottomMenu} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
