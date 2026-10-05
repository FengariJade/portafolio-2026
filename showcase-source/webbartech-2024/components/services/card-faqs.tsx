"use client";

import { services } from "@/data/information";
import { useI18n } from "@/locales/client";
import Image from "next/image";
import { motion } from "framer-motion";


export default function CardFaqs({ endpoint }: { endpoint: string }) {
  const t = useI18n();
  const data = services.find((item) => item.endpoint === endpoint);

  if (!data?.faqs) return null;

  return (
    <>
      {/* ================= FAQ CARDS ================= */}
      <section className="w-full px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pt-32 sm:pt-40 md:pt-48 lg:pt-56 xl:pt-64">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
          {data.faqs.filter(faq => faq.showAsCard).map((item, index) => (
            <div
              key={index}
              className="
                group
                w-full
                max-w-[380px]
                rounded-[60px]
                border
                border-gray-300
                p-10
                transition-all
                duration-300
                hover:border-[#42c6df]
              "
            >
              {/* ICONO */}
              <div
                className="
                  mx-auto
                  mb-6
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-300
                  transition-colors
                  duration-300
                  group-hover:bg-[#42c6df]
                "
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="object-contain"
                />

              </div>

              <h3 className="mb-4 text-center font-semibold text-gray-500 transition-colors duration-300 group-hover:text-black">
                {t(item.question as keyof typeof t)}
              </h3>

              <p className="text-center text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-black">
                {t(item.answer as keyof typeof t)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BENEFICIOS ================= */}
      <section className="w-full pt-32 md:pt-40 pb-32">
        <h2 className="
          mb-24
          text-center
          text-5xl
          sm:text-6xl
          md:text-7xl
          xl:text-8xl
          font-extrabold
          uppercase
        ">
          Beneficios principales
        </h2>


        <div className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          md:grid-cols-2
          gap-y-16
          md:gap-x-32
          px-6 md:px-12 xl:px-20
        ">
          {[
            {
              title: "Reducción y control de costos",
              text: "Outsourcing permite convertir costos variables en gastos previsibles, evitando grandes inversiones en infraestructura.",
              side: "left",
              filled: true,
            },
            {
              title: "Acceso a talento especializado y actualizado",
              text: "Equipo profesional con experiencia avanzada en tecnologías actuales.",
              side: "right",
              filled: false,
            },
            {
              title: "Enfoque en el negocio principal",
              text: "Permite centrar esfuerzos en competencias clave del negocio.",
              side: "left",
              filled: false,
            },
            {
              title: "Escalabilidad y flexibilidad operativa",
              text: "Ajusta rápidamente recursos según la demanda.",
              side: "right",
              filled: true,
            },
            {
              title: "Mejor gestión de riesgos y seguridad",
              text: "Protocolos robustos para proteger datos críticos.",
              side: "left",
              filled: true,
            },
            {
              title: "Acceso a tecnología y herramientas de vanguardia",
              text: "Uso de herramientas modernas sin inversión elevada.",
              side: "right",
              filled: false,
            },
          ].map((item, index) => {
            const isLeft = item.side === "left";

            const offsetClass = isLeft
              ? "md:-translate-x-24 lg:-translate-x-32"
              : "md:translate-x-24 lg:translate-x-32";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -80 : 80, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`
                  w-full
                  md:w-[560px]
                  min-h-[300px]
                  rounded-[36px]
                  px-10
                  py-12
                  flex flex-col justify-center
                  transform
                  ${offsetClass}
                  ${
                    item.filled
                      ? "bg-[#42c6df] text-white"
                      : "border-2 border-[#42c6df] text-black"
                  }
                `}
              >
                <h3 className="mb-4 text-xl md:text-2xl font-extrabold">
                  {item.title}
                </h3>

                <p className="text-sm md:text-base leading-relaxed opacity-90">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>


        {/* ================= CTA ================= */}
        <div className="mt-32 w-full bg-black py-12 md:py-16">
          <div className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-start
            justify-between
            gap-8
            px-6
            md:flex-row
            md:items-center
            md:px-12
            xl:px-20
          ">

          {/* BLOQUE TEXTO */}
          <div className="flex flex-col items-start gap-2">

            {/* LÍNEA 1 */}
            <h2
              className="
                max-w-5xl
                text-3xl
                sm:text-4xl
                md:text-5xl
                xl:text-6xl
                font-extrabold
                uppercase
                leading-tight
                text-white
                flex
                flex-wrap
                gap-3
              "
            >
              <span>Desarrolla</span>
              <span
                className="
                  text-[#42c6df]
                  animate-typing
                  overflow-hidden
                  whitespace-nowrap
                "
              >
                soluciones
              </span>
            </h2>

            {/* LÍNEA 2 */}
            <h2
              className="
                max-w-5xl
                text-3xl
                sm:text-4xl
                md:text-5xl
                xl:text-6xl
                font-extrabold
                uppercase
                leading-tight
                flex
                flex-wrap
                gap-3
              "
            >
              <span className="text-[#42c6df]">Digitales</span>
              <span className="text-white">a tu medida</span>
            </h2>

          </div>

            {/* BOTÓN */}
            <button
              className="
                shrink-0
                rounded-full
                bg-[#42c6df]
                px-10
                py-4
                text-lg
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-xl
              "
            >
              Escríbenos
            </button>

          </div>
        </div>
      </section>
    </>
  );
}
