import { footer } from "@/data/information";
import { Logo } from "./icons";
import Link from "next/link";
import { CardFooterCallAction } from "./card-footer-call_action";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { GoTopBtn } from "./ui/go-top-btn";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import clsx from "clsx";

export const FooterHome = async () => {
  const t = await getI18n();
  return (
    <footer className="flex flex-col bg-salte-100 text-slate-800">
      {/* CTA ARRIBA */}
      <CardFooterCallAction />

      {/* CONTENIDO PRINCIPAL */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* COLUMNA IZQUIERDA */}
          <div className="flex flex-col gap-8">
            {/* Dirección */}
            <div className="flex items-start gap-5">
              <Image
                src="/images/footer/ubicacion.svg"
                alt="Ubicación"
                width={34}
                height={34}
                className="mt-1"
              />
              <p className="text-base leading-relaxed">
                Hermanos Villarán 112,<br />
                oficina 102 Rimac, Lima – Perú
              </p>
            </div>

            {/* Redes sociales */}
            <div className="flex gap-8">
              {footer.socials.map((item, i) => (
                <Link
                  key={`social_${i}`}
                  href={item.href}
                  target="_blank"
                  className="hover:scale-110 hover:opacity-80 transition-transform"
                >
                  <Icon
                    icon={item.icon}
                    className="text-3xl text-blue-600"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMNA CENTRAL (NO TOCAR) */}
          <div className="flex flex-col gap-3 text-base font-medium items-start text-left md:items-start md:text-left md:max-w-xs md:mx-auto">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/servicios" className="hover:underline">Servicios</Link>
            <Link href="/nosotros" className="hover:underline">Nosotros</Link>
            <Link href="/portafolio" className="hover:underline">Portafolio</Link>
            <Link href="/oportunidad-laboral" className="hover:underline">
              Oportunidad laboral
            </Link>
            <Link href="/contacto" className="hover:underline">Contáctanos</Link>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="flex flex-col items-start md:items-end gap-8">
            <Logo className="w-48" />

            {/* Email */}
            <div className="flex items-center gap-5">
              <Image
                src="/images/footer/mail.svg"
                alt="Email"
                width={30}
                height={30}
              />
              <span className="text-base">info@bartech.pe</span>
            </div>

            {/* Teléfono */}
            <div className="flex items-center gap-5">
              <Image
                src="/images/footer/telefono.svg"
                alt="Teléfono"
                width={30}
                height={30}
              />
              <span className="text-base">
                (511) 501-7488 / (511) 501-748
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER INFERIOR */}
      <div className="bg-black border-t border-slate-800 text-white px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

        <span className="opacity-80">
          © 2026 Bartech. Todos los derechos reservados.
        </span>

        <div className="flex gap-8">
          <Link
            href="/politicas-privacidad"
            className="hover:underline opacity-80 hover:opacity-100 transition"
          >
            Políticas y privacidad
          </Link>

          <Link
            href="/politicas-cookies"
            className="hover:underline opacity-80 hover:opacity-100 transition"
          >
            Políticas de cookies
          </Link>
        </div>

      </div>
    </footer>
  );
};

export const FooterAll = async ({ hideRobot }: { hideRobot?: boolean }) => {
  const t = await getI18n();

  return (
    <footer className="relative flex flex-col bg-slate-100 text-slate-800">
      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* COLUMNA IZQUIERDA */}
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-5">
              <Image
                src="/images/footer/ubicacion.svg"
                alt="Ubicación"
                width={34}
                height={34}
                className="mt-1"
              />
              <p className="text-base leading-relaxed">
                Hermanos Villarán 112,<br />
                oficina 102 Rimac, Lima – Perú
              </p>
            </div>

            <div className="flex gap-8">
              {footer.socials.map((item, i) => (
                <Link
                  key={`social_${i}`}
                  href={item.href}
                  target="_blank"
                  className="hover:scale-110 hover:opacity-80 transition-transform"
                >
                  <Icon
                    icon={item.icon}
                    className="text-3xl text-blue-600"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMNA CENTRAL */}
          <div className="flex flex-col gap-3 text-base font-medium items-start md:max-w-xs md:mx-auto">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/servicios" className="hover:underline">Servicios</Link>
            <Link href="/nosotros" className="hover:underline">Nosotros</Link>
            <Link href="/portafolio" className="hover:underline">Portafolio</Link>
            <Link href="/oportunidad-laboral" className="hover:underline">
              Oportunidad laboral
            </Link>
            <Link href="/contacto" className="hover:underline">Contáctanos</Link>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="flex flex-col items-start md:items-end gap-8">
            <Logo className="w-48" />

            <div className="flex items-center gap-5">
              <Image
                src="/images/footer/mail.svg"
                alt="Email"
                width={30}
                height={30}
              />
              <span className="text-base">info@bartech.pe</span>
            </div>

            <div className="flex items-center gap-5">
              <Image
                src="/images/footer/telefono.svg"
                alt="Teléfono"
                width={30}
                height={30}
              />
              <span className="text-base">
                (511) 501-7488 / (511) 501-748
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER INFERIOR */}
      <div className="bg-black border-t border-slate-800 text-white px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

        <span className="opacity-80">
          © 2026 Bartech. {t(footer.rights as keyof typeof t)}
        </span>

        <div className="flex items-center gap-8">
          <Link
            href="/politicas-privacidad"
            className="hover:underline opacity-80 hover:opacity-100 transition"
          >
            Políticas y privacidad
          </Link>

          <Link
            href="/politicas-cookies"
            className="hover:underline opacity-80 hover:opacity-100 transition"
          >
            Políticas de cookies
          </Link>

          <GoTopBtn />
        </div>

      </div>
    </footer>
  );
};
