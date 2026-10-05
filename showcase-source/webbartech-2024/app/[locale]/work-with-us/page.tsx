import { FooterAll } from "@/components/footer";
import CardWorkChance from "@/components/work-with-us/card-work-chance";
import { CardWorkMain } from "@/components/work-with-us/card-work-main";
import { CardWorkMision } from "@/components/work-with-us/card-work-mision";
import CardWorkOportunities from "@/components/work-with-us/card-work-oportunities";
import { workSeo } from "@/data/seo";
import { getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata({ params }: { params: any }) {
  const { slug } = params;

  return {
    title: workSeo.title,
    description: workSeo.description,
    keywords: workSeo.keywords,
    openGraph: {
      title: workSeo.title,
      description: workSeo.description,
      url: workSeo.url,
    },
  };
}

export default function WorkWithUs({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setStaticParamsLocale(locale);
  return (
    <div className="-mt-20 overflow-hidden">
      <section className="w-full">
        <CardWorkMain />
      </section>
     {/*  <section className="w-full py-10">
        <CardWorkMision />
      </section>
      <section className="w-full py-10">
        <CardWorkChance />
      </section> */}
      <section className="w-full py-10">
        <CardWorkOportunities />
      </section>
      <FooterAll />
    </div>
  );
}
