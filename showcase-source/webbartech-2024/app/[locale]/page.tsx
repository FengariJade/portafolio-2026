import CardCustomers from "@/components/card-customers";
import { CardHomeMain } from "@/components/home/card-home-main";
import { CardTag, CardTag2 } from "@/components/home/card-tag";
import { CardHomeServices } from "@/components/home/card-home-services";
import { CardHomeTestimonials } from "@/components/home/card-home-testimonials";
import { CardHomeAbout } from "@/components/home/card-home-about";
import { homeSeo } from "@/data/seo";
import { FooterHome } from "@/components/footer";
import { getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata({ params }: { params: any }) {
  return {
    title: homeSeo.title,
    description: homeSeo.description,
    keywords: homeSeo.keywords,
    openGraph: {
      title: homeSeo.title,
      description: homeSeo.description,
      url: homeSeo.url,
    },
  };
}

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setStaticParamsLocale(locale);
  return (
    <div className="-mt-20 overflow-hidden">
      <section className="w-full">
        <CardHomeMain />
      </section>
      <section className="relative w-full">
        <CardHomeAbout />
      </section>
      <section className="w-full px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex justify-center items-center py-12">
          <CardTag />
        </div>
      </section>
      <section className="relative w-full">
        <div className="lg:h-screen py-12">
          <CardHomeServices />
        </div>
      </section>
      <section className="relative w-full">
        <div className="py-4 lg:py-12">
          <CardCustomers />
        </div>
      </section>
      {/* <section className="w-full px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        <div className="py-4 lg:py-16">
          <CardHomeTestimonials />
        </div>
      </section> */}
      <section className="relative w-full">
        <div className="py-4 lg:py-12">
          <CardTag2 />
        </div>
      </section>

      <FooterHome />
    </div>
  );
}
