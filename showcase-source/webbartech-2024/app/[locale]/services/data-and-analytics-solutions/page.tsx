import CardServiceDetail from "@/components/services/card-service-detail";
import { serviceSeo } from "@/data/seo";
import CardFaqs from "@/components/services/card-faqs";
import { getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

const endpoint = "data-and-analytics-solutions";

export function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata() {
  const seoItem = serviceSeo.find((it) => it.endpoint === endpoint);

  return {
    title: seoItem?.title,
    description: seoItem?.description,
    keywords: seoItem?.keywords,
    openGraph: {
      title: seoItem?.title,
      description: seoItem?.description,
    },
  };
}

export default function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setStaticParamsLocale(locale);
  return (
    <>
      <div className="w-full">
        <CardServiceDetail endpoint={endpoint} />
      </div>
      <div className="w-full">
        <CardFaqs endpoint={endpoint} />
      </div>
    </>
  );
}
