import { portfolioSeo } from "@/data/seo";
import { CardPortfolioDetail } from "@/components/portfolio/card-portfolio-detail";
import { FooterAll } from "@/components/footer";
import { getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

const endpoint = "sma";

export function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata() {
  return {
    title: portfolioSeo.title,
    description: portfolioSeo.description,
    keywords: portfolioSeo.keywords,
    openGraph: {
      title: portfolioSeo.title,
      description: portfolioSeo.description,
      url: portfolioSeo.url,
    },
  };
}
export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setStaticParamsLocale(locale);
  return (
    <div className="-mt-20 overflow-hidden">
      <CardPortfolioDetail endpoint={endpoint} />

      <FooterAll />
    </div>
  );
}
