import Image from "next/image";

type MapButtonProps = {
  top: string;
  left: string;
};

export const MapButton = ({ top, left }: MapButtonProps) => {
  return (
   <button
      className="
        absolute
        -translate-x-1/2
        -translate-y-1/2
        z-20
        group
        flex
        items-center
      "
      style={{ top, left }}
    >
      {/* LISTÓN (DETRÁS DEL SVG) */}
      <span
        className="
          absolute
          left-full
          top-1/2
          -translate-y-1/2

          h-10
          md:h-6
          px-8

          bg-red-600
          text-white
          text-sm md:text-base
          font-medium
          rounded-r-full
          whitespace-nowrap

          opacity-0
          scale-x-0
          origin-left
          group-hover:opacity-100
          group-hover:scale-x-100

          transition-all
          duration-300
          ease-out
        "
      >
        País
      </span>

      {/* ICONO (ENCIMA) */}
      <Image
        src="/images/home/buttonicon.svg"
        alt="Ubicación"
        width={64}
        height={64}
        className="
          w-14 h-14
          md:w-16 md:h-16
          relative
          z-10
        "
      />
    </button>
  );
};
