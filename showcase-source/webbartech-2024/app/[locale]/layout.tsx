import type { ReactElement } from "react";
import "@/styles/globals.css";
import { Header } from "@/components/header";
import { Provider } from "./provider";
import { homeSeo } from "@/data/seo";

// Uncomment to test Static Generation for all pages


export const metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    url: homeSeo.url,
  },
  icons: {
    icon: "favicon.ico", // Ruta en la carpeta public
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactElement;
  params: { locale: string };
}) {
  return (
    <html lang="es">
      <body>
        <div className="min-scroll p-0 m-0 bg-slate-100">
          <Header />
          <Provider locale={locale}>
            <main className="pt-20">
              {children}
            </main>
          </Provider>
        </div>
      </body>
    </html>
  );
}

// import type { ReactElement } from "react";
// import "@/styles/globals.css";
// import { Header } from "@/components/header";
// import { Footer } from "@/components/footer";
// import { getStaticParams } from "@/locales/server";

// export const metadata = {
//   title: "Bartech",
//   description: "Bartech",
// };

// // Uncomment to test Static Generation for all pages
// export function generateStaticParams() {
//   return getStaticParams();
// }

// export default function RootLayout({ children }: { children: ReactElement }) {
//   return (
//     <html lang="es">
//       <body>
//         <div className="bg-slate-100">
//           <Header />
//           <main className="pt-20">{children}</main>
//           {/* <Footer /> */}
//         </div>
//       </body>
//     </html>
//   );
// }
