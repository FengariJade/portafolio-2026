import { FooterAll } from "@/components/footer";
import { CardPortfolioMain } from "@/components/portfolio/card-portfolio-main";
import CardPortfolioProjects from "@/components/portfolio/card-portfolio-projects";
import { portfolioSeo } from "@/data/seo";
import { getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

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

export default function Portfolio({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setStaticParamsLocale(locale);
  return (
    <div className="-mt-20 overflow-hidden">
      <section className="w-full">
        <CardPortfolioMain />
      </section>
      <section className="relative w-full">
        <CardPortfolioProjects />
      </section>
      <FooterAll />
    </div>
  );
}
