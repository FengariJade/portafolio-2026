import { aboutSeo } from "@/data/seo";
import { FooterAll } from "@/components/footer";
import { getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import { CardContactMain } from "@/components/contact-us/card-contact-main";
import { FormContactMain } from "@/components/contact-us/form-contact-main";

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

export default function ContactUsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setStaticParamsLocale(locale);
  return (
    <div className="-mt-20 overflow-hidden">
      <section className="w-full">
        <CardContactMain />
      </section>
      <section className="w-full py-10">
        <FormContactMain />
      </section>
      <FooterAll />
    </div>
  );
}
