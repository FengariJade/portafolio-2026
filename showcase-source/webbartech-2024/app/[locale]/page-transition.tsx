"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
        style={{ position: "relative" }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}