"use client";
import { Icon } from "@iconify-icon/react";
import { motion } from "framer-motion";

export const IconRotate = ({
  icon,
  className,
  direction,
}: {
  icon: string;
  className: string;
  direction?: "left" | "right";
}) => {
  return (
    <motion.div
      animate={{ rotate: direction === "left" ? -360 : 360 }}
      initial={{ rotate: 0 }}
      transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      className="flex justify-center items-center"
    >
      <Icon icon={icon} className={className} />
    </motion.div>
  );
};
