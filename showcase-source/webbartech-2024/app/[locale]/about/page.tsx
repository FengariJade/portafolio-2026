import { CardAbout } from "@/components/card-about";
import { CardAboutPurpose } from "@/components/about/card-about-purpose";
import { CardAboutReasons } from "@/components/about/card-about-reasons";
import { CardAboutResponsablility } from "@/components/about/card-about-responsibility";
import { CardAboutFigures } from "@/components/about/card-about-figures";
import { aboutSeo } from "@/data/seo";
import { FooterAll } from "@/components/footer";
import { getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata() {
  return {
    title: aboutSeo.title,
    description: aboutSeo.description,
    keywords: aboutSeo.keywords,
    openGraph: {
      title: aboutSeo.title,
      description: aboutSeo.description,
      url: aboutSeo.url,
    },
  };
}

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setStaticParamsLocale(locale);
  return (
    <div className="-mt-20 overflow-hidden">
      <section className="w-full">
        <CardAbout />
      </section>
      <section className="w-full py-10">
        <CardAboutPurpose />
      </section>
      <section className="w-full py-10">
        <CardAboutReasons />
      </section>
      <section className="w-full py-10 z-0">
        <CardAboutResponsablility />
      </section>
      <section className="w-full py-10 z-10">
        <CardAboutFigures />
      </section>
      <FooterAll />
    </div>
  );
}
