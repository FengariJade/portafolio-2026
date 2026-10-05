"use client";

import { Icon } from "@iconify-icon/react";
import { Button } from "@nextui-org/react";

export const GoTopBtn = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll effect
    });
  };
  return (
    <Button
      data-hoverable
      variant="bordered"
      isIconOnly
      className="rounded-full border text-default-700 border-default-500"
      onPress={scrollToTop}
      size="sm"
    >
      <Icon icon="carbon:arrow-up" className="text-base" />
    </Button>
  );
};
