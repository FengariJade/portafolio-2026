export type Submenu = {
  label: string;
  href?: string;
};
export type MenuType = {
  label: string;
  href: string;
  isActive: boolean;
  children?: Submenu[];
  isSolid?: boolean;
  showOnMobile?: boolean;
};

// /data/information.ts

export interface ServiceFaq {
  icon: string;        // iconify o /public path
  question: string;    // i18n key
  answer: string;      // i18n key
  isActive: boolean;
  showAsCard?: boolean;
}


export interface ServiceItem {
  icon: string;
  cover: string;
  title: string;
  description: string;
  endpoint: string;
  cards: string[];
  faqs: ServiceFaq[];
}


export const footer = {
  socials: [
    {
      label: "socials.ig",
      href: "https://www.instagram.com/bartechpe",
      icon: "ion:logo-instagram",
    },
    {
      label: "socials.li",
      href: "https://www.linkedin.com/company/bartech-cti",
      icon: "ion:logo-linkedin",
    },
    {
      label: "socials.fb",
      href: "https://www.facebook.com/bartech.pe",
      icon: "ion:logo-facebook",
    },
    {
      label: "socials.x",
      href: "https://x.com/BartechPeru",
      icon: "ion:logo-x",
    },
    {
      label: "socials.yt",
      href: "https://www.youtube.com/channel/UCwFtnq_vD82JeU_LPrts3mA",
      icon: "ion:logo-youtube",
    },
  ],
  email: "hola@bartech.pe",
  phone: "+51 999 999 999",
  rights: "footer.rights",
};

export const services: ServiceItem[] = [
 /*  {
    // icon: "/images/services/icons/systems-development.png",
    icon: "/images/services/icons/application-development.png",
    cover: "/images/services/new/desarrolloaplicaciones.webp",
    title: "services.items.dev_systems.title",
    description: "services.items.dev_systems.description",
    endpoint: "systems-development",
    cards: [
      "services.items.dev_systems.card1",
      "services.items.dev_systems.card2",
      "services.items.dev_systems.card3",
      "services.items.dev_systems.card4",
      "services.items.dev_systems.card5",
      "services.items.dev_systems.card6",
    ],
    faqs: [
      {
        question: "faqs.items.question1.subtitle",
        answer: "faqs.items.question1.description",
        isActive: true,
      },
      {
        question: "faqs.items.question2.subtitle",
        answer: "faqs.items.question2.description",
        isActive: false,
      },
      {
        question: "faqs.items.question3.subtitle",
        answer: "faqs.items.question3.description",
        isActive: false,
      },
      {
        question: "faqs.items.question4.subtitle",
        answer: "faqs.items.question4.description",
        isActive: false,
      },
      {
        question: "faqs.items.question5.subtitle",
        answer: "faqs.items.question5.description",
        isActive: false,
      },
      {
        question: "faqs.items.question6.subtitle",
        answer: "faqs.items.question6.description",
        isActive: false,
      },
      {
        question: "faqs.items.question7.subtitle",
        answer: "faqs.items.question7.description",
        isActive: false,
      },
      {
        question: "faqs.items.question8.subtitle",
        answer: "faqs.items.question8.description",
        isActive: false,
      },
      {
        question: "faqs.items.question9.subtitle",
        answer: "faqs.items.question9.description",
        isActive: false,
      },
      {
        question: "faqs.items.question10.subtitle",
        answer: "faqs.items.question10.description",
        isActive: false,
      },
    ],
  }, */
  {
    icon: "/images/services/icons/application-development.png",
    cover: "/images/services/new/desarrolloaplicaciones.webp",
    title: "services.items.dev_apps.title",
    description: "services.items.dev_apps.description",
    endpoint: "application-development",
    cards: [
      "services.items.dev_apps.card1",
      "services.items.dev_apps.card2",
      "services.items.dev_apps.card3",
      "services.items.dev_apps.card4",
      "services.items.dev_apps.card5",
      "services.items.dev_apps.card6",
    ],
    faqs: [
      {
        icon: "/icons/newService/APPLIICON2.svg",
        question: "faqs.items.question1.subtitle",
        answer: "faqs.items.question1.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon: "/icons/newService/APPLIICON.svg",
        question: "faqs.items.question2.subtitle",
        answer: "faqs.items.question2.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon: "/icons/newService/APPLIICON3.svg",
        question: "faqs.items.question3.subtitle",
        answer: "faqs.items.question3.description",
        isActive: false,
        showAsCard: true,
      },
    ],

    /* benefits: [
      {
        title: "services.items.dev_apps.benefit1.title",
        text: "services.items.dev_apps.benefit1.text",
        side: "left",
        filled: true,
      },
      {
        title: "services.items.dev_apps.benefit2.title",
        text: "services.items.dev_apps.benefit2.text",
        side: "right",
        filled: false,
      },
      {
        title: "services.items.dev_apps.benefit3.title",
        text: "services.items.dev_apps.benefit3.text",
        side: "left",
        filled: false,
      },
      {
        title: "services.items.dev_apps.benefit4.title",
        text: "services.items.dev_apps.benefit4.text",
        side: "right",
        filled: true,
      },
      {
        title: "services.items.dev_apps.benefit5.title",
        text: "services.items.dev_apps.benefit5.text",
        side: "left",
        filled: true,
      },
      {
        title: "services.items.dev_apps.benefit6.title",
        text: "services.items.dev_apps.benefit6.text",
        side: "right",
        filled: false,
      },
    ], */

  },
  {
    icon: "/images/services/icons/proccess-automation-rpa.png",
    cover: "/images/services/new/automatizacionprocesos.webp",
    title: "services.items.rpa.title",
    description: "services.items.rpa.description",
    endpoint: "proccess-automation-rpa",
    cards: [
      "services.items.rpa.card1",
      "services.items.rpa.card2",
      "services.items.rpa.card3",
      "services.items.rpa.card4",
      "services.items.rpa.card5",
      "services.items.rpa.card6",
    ],
    faqs: [
      {
        icon:"/icons/newService/AUTOICON3.svg",
        question: "faqs.items.question1.subtitle",
        answer: "faqs.items.question1.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon:"/icons/newService/AUTOICON.svg",
        question: "faqs.items.question2.subtitle",
        answer: "faqs.items.question2.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon:"/icons/newService/AUTOICON2.svg",
        question: "faqs.items.question3.subtitle",
        answer: "faqs.items.question3.description",
        isActive: false,
        showAsCard: true,
      },
    ],
  },
  {
    icon: "/images/services/icons/data-and-analytics-solutions.png",
    cover: "/images/services/new/solucionesdataanalitica.webp",
    title: "services.items.data_analytics.title",
    description: "services.items.data_analytics.description",
    endpoint: "data-and-analytics-solutions",
    cards: [
      "services.items.data_analytics.card1",
      "services.items.data_analytics.card2",
      "services.items.data_analytics.card3",
      "services.items.data_analytics.card4",
      "services.items.data_analytics.card5",
      "services.items.data_analytics.card6",
    ],
    faqs: [
      {
        icon:"/icons/newService/SOLUICON3.svg",
        question: "faqs.items.question1.subtitle",
        answer: "faqs.items.question1.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon:"/icons/newService/SOLUICON.svg",
        question: "faqs.items.question2.subtitle",
        answer: "faqs.items.question2.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon:"/icons/newService/SOLUICON2.svg",
        question: "faqs.items.question3.subtitle",
        answer: "faqs.items.question3.description",
        isActive: false,
        showAsCard: true,
      },
    ],
  },
  {
    icon: "/images/services/icons/technological-outsourcing.png",
    cover: "/images/services/new/outsourcingtecnologico.webp",
    title: "services.items.outsourcing.title",
    description: "services.items.outsourcing.description",
    endpoint: "technological-outsourcing",
    cards: [
      "services.items.outsourcing.card1",
      "services.items.outsourcing.card2",
      "services.items.outsourcing.card3",
      "services.items.outsourcing.card4",
      "services.items.outsourcing.card5",
      "services.items.outsourcing.card6",
    ],
    faqs: [
      {
        icon:"/icons/newService/OUTICON2.svg",
        question: "faqs.items.question1.subtitle",
        answer: "faqs.items.question1.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon:"/icons/newService/OUTICON.svg",
        question: "faqs.items.question2.subtitle",
        answer: "faqs.items.question2.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon:"/icons/newService/OUTICON3.svg",
        question: "faqs.items.question3.subtitle",
        answer: "faqs.items.question3.description",
        isActive: false,
        showAsCard: true,
      },
    ],
  },
  {
    icon: "/images/services/icons/no-code-and-low-code.png",
    cover: "/images/services/new/nocodelowcode.webp",
    title: "services.items.no_code.title",
    description: "services.items.no_code.description",
    endpoint: "no-code-and-low-code",
    cards: [
      "services.items.no_code.card1",
      "services.items.no_code.card2",
      "services.items.no_code.card3",
      "services.items.no_code.card4",
      "services.items.no_code.card5",
      "services.items.no_code.card6",
    ],
    faqs: [
      {
        icon:"/icons/newService/LOWICON.svg",
        question: "faqs.items.question1.subtitle",
        answer: "faqs.items.question1.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon:"/icons/newService/LOWICON2.svg",
        question: "faqs.items.question2.subtitle",
        answer: "faqs.items.question2.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon:"/icons/newService/LOWICON3.svg",
        question: "faqs.items.question3.subtitle",
        answer: "faqs.items.question3.description",
        isActive: false,
        showAsCard: true,
      },
    ],
  },
  {
    icon: "/images/services/icons/ai-and-machine-learning-models.png",
    cover: "/images/services/new/iamachinelearning.webp",
    title: "services.items.ia.title",
    description: "services.items.ia.description",
    endpoint: "ai-and-machine-learning-models",
    cards: [
      "services.items.ia.card1",
      "services.items.ia.card2",
      "services.items.ia.card3",
      "services.items.ia.card4",
      "services.items.ia.card5",
      "services.items.ia.card6",
    ],
    faqs: [
      {
        icon:"/icons/newService/IAICON2.svg",
        question: "faqs.items.question1.subtitle",
        answer: "faqs.items.question1.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon:"/icons/newService/IAICON3.svg",
        question: "faqs.items.question2.subtitle",
        answer: "faqs.items.question2.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon:"/icons/newService/IAICON.svg",
        question: "faqs.items.question3.subtitle",
        answer: "faqs.items.question3.description",
        isActive: false,
        showAsCard: true,
      },
    ],
  },
  {
    icon: "/images/services/icons/infrastructure-and-it-support.png",
    cover: "/images/services/new/infraestructurasoporteti.webp",
    title: "services.items.support_ti.title",
    description: "services.items.support_ti.description",
    endpoint: "infrastructure-and-it-support",
    cards: [
      "services.items.support_ti.card1",
      "services.items.support_ti.card2",
      "services.items.support_ti.card3",
      "services.items.support_ti.card4",
      "services.items.support_ti.card5",
      "services.items.support_ti.card6",
    ],
    faqs: [
      {
        icon:"/icons/newService/INFRAICON.svg",
        question: "faqs.items.question1.subtitle",
        answer: "faqs.items.question1.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon:"/icons/newService/INFRAICON_2.svg",
        question: "faqs.items.question2.subtitle",
        answer: "faqs.items.question2.description",
        isActive: false,
        showAsCard: true,
      },
      {
        icon:"/icons/newService/INFRAICON_1.svg",
        question: "faqs.items.question3.subtitle",
        answer: "faqs.items.question3.description",
        isActive: false,
        showAsCard: true,
      },
    ],
  },
];

export const reasons = [
  {
    icon: "/icons/razones/experiencia.png",
    title: "about.reasons.items.item_1.title",
    description: "about.reasons.items.item_1.description",
  },
  {
    icon: "/icons/razones/soluciones.png",
    title: "about.reasons.items.item_2.title",
    description: "about.reasons.items.item_2.description",
  },
  {
    icon: "/icons/razones/soporte.png",
    title: "about.reasons.items.item_3.title",
    description: "about.reasons.items.item_3.description",
  },
  {
    icon: "/icons/razones/innovacion.png",
    title: "about.reasons.items.item_4.title",
    description: "about.reasons.items.item_4.description",
  },
];

export const figures = [
  {
    title: "about.figures.item1",
    value: "+09",
    color: "normal",
    colorMobile: "normal",
  },
  {
    title: "about.figures.item2",
    value: "+50",
    color: "outline",
    colorMobile: "outline",
  },
  {
    title: "about.figures.item3",
    value: "+70",
    color: "outline",
    colorMobile: "dark",
  },
  {
    title: "about.figures.item4",
    value: "+20",
    color: "dark",
    colorMobile: "outline",
  },
];

export const projects = [
  {
    title: "portfolio.sma.title",
    tag: "portfolio.sma.tag",
    client: "portfolio.sma.client",
    image: "/images/portfolio/sma/sma-fondo.webp",
    imagePortfolio: "/images/portfolio/sma/sma.webp",
    imageCover: "/images/portfolio/sma/sma_mull.webp",
    backgroundImage: "/images/portfolio/sma/sma-portada.webp",
    endpoint: "sma",
    technologies: "portfolio.sma.technologies",
    years: "portfolio.sma.years",
    techUsed: [
      {
        icon: "/icons/java.png",
        name: "portfolio.sma.techUsed.tech1.name",
        description: "portfolio.sma.techUsed.tech1.description",
      },
      {
        icon: "/icons/angular.png",
        name: "portfolio.sma.techUsed.tech2.name",
        description: "portfolio.sma.techUsed.tech2.description",
      },
      {
        icon: "/icons/postgresql.png",
        name: "portfolio.sma.techUsed.tech3.name",
        description: "portfolio.sma.techUsed.tech3.description",
      },
      {
        icon: "/icons/arcgis.png",
        name: "portfolio.sma.techUsed.tech4.name",
        description: "portfolio.sma.techUsed.tech4.description",
      },
    ],
    aboutSystem1: "portfolio.sma.description1",
    aboutSystem2: "portfolio.sma.description2",
    imageResponsive: [
      "/images/portfolio/sma/sma-desktop-responsive.png",
      "/images/portfolio/sma/sma-mobile-responsive.png",
    ],
    listProcess: [
      {
        icon: "/icons/proceso-desarrollo/analisis-requisitos.png",
        title: "Análisis de Requisitos",
        description:
          "Entendimos las necesidades específicas de Sernanp y los desafíos ambientales que enfrentan.",
      },
      {
        icon: "/icons/proceso-desarrollo/desing-system.png",
        title: "Diseño del Sistema",
        description:
          "Creamos un diseño arquitectónico que garantizara la eficiencia y la escalabilidad del sistema.",
      },
      {
        icon: "/icons/proceso-desarrollo/desarrollo-integracion.png",
        title: "Desarrollo e Integración",
        description:
          "Utilizando un enfoque ágil, desarrollamos e integramos los componentes del sistema, asegurando una perfecta sincronización entre el backend y el frontend.",
      },
      {
        icon: "/icons/proceso-desarrollo/pruebas.png",
        title: "Pruebas y Validación",
        description:
          "Realizamos pruebas exhaustivas para asegurar que el sistema cumpla con los más altos estándares de calidad y funcione sin problemas en todas las condiciones operativas.",
      },
      {
        icon: "/icons/proceso-desarrollo/despliegue-capacitacion.png",
        title: "Despliegue y Capacitación",
        description:
          "Implementamos el sistema a nivel nacional y proporcionamos capacitación a los usuarios finales para garantizar una adopción exitosa.",
      },
    ],
    more: [
      {
        icon: "/icons/mas-sobre/desafios-soluciones.png",
        title: "Desafíos y Soluciones",
        description:
          "El proyecto enfrentó varios desafíos, incluyendo la integración de datos provenientes de múltiples fuentes y la necesidad de operatividad en tiempo real en un entorno geográficamente diverso. Sin embargo, gracias a nuestro equipo altamente capacitado y la utilización de tecnologías avanzadas, logramos superar estos obstáculos y entregar un sistema robusto y fiable.",
        isList: false,
        items: [],
      },
      {
        icon: "/icons/mas-sobre/impacto.png",
        title: "Impacto Nacional",
        description:
          "El SMA permite a Sernanp monitorear en tiempo real las condiciones ambientales en todo el territorio peruano, facilitando la toma de decisiones informadas y la implementación de medidas de conservación más efectivas. Este proyecto no solo demuestra nuestra capacidad para gestionar proyectos grandes y complejos, sino también nuestro compromiso con la protección del medio ambiente.",
        isList: false,
        items: [],
      },
      {
        icon: "/icons/mas-sobre/resumen.png",
        title: "En resumen",
        description:
          "El Sistema de Monitoreo Ambiental desarrollado para Sernanp es un ejemplo claro de cómo Bartech puede transformar la gestión ambiental a través de la tecnología, brindando soluciones innovadoras y efectivas a nivel nacional.",
        isList: false,
        items: [],
      },
    ],
    subtitle_2: "portfolio.sma.subtitle_2",
    captures: [
      {
        image: "/images/portfolio/sma/sma-capture-1.webp",
        alt: "portfolio.sma.captures.alt",
      },
      {
        image: "/images/portfolio/sma/sma-capture-2.webp",
        alt: "portfolio.sma.captures.alt",
      },
      {
        image: "/images/portfolio/sma/sma-capture-3.webp",
        alt: "portfolio.sma.captures.alt",
      },
      {
        image: "/images/portfolio/sma/sma-capture-4.webp",
        alt: "portfolio.sma.captures.alt",
      },
    ],
  },
  {
    title: "portfolio.portalSernanp.title",
    tag: "portfolio.portalSernanp.tag",
    client: "portfolio.portalSernanp.client",
    image:
      "/images/portfolio/portal-biodiversidad/portal-biodiversidad-fondo.webp",
    imagePortfolio:
      "/images/portfolio/portal-biodiversidad/portal-biodiversidad.webp",
    imageCover: "/images/portfolio/portal-biodiversidad/portal_response.webp",
    backgroundImage:
      "/images/portfolio/portal-biodiversidad/portal-biodiversidad-portada.webp",
    endpoint: "portal-biodiversidad",
    technologies: "portfolio.portalSernanp.technologies",
    years: "portfolio.portalSernanp.years",
    techUsed: [
      {
        icon: "/icons/java.png",
        name: "portfolio.portalSernanp.techUsed.tech1.name",
        description: "portfolio.portalSernanp.techUsed.tech1.description",
      },
      {
        icon: "/icons/angular.png",
        name: "portfolio.portalSernanp.techUsed.tech2.name",
        description: "portfolio.portalSernanp.techUsed.tech2.description",
      },
      {
        icon: "/icons/postgresql.png",
        name: "portfolio.portalSernanp.techUsed.tech3.name",
        description: "portfolio.portalSernanp.techUsed.tech3.description",
      },
    ],
    aboutSystem1: "portfolio.portalSernanp.description1",
    aboutSystem2: "portfolio.portalSernanp.description2",
    imageResponsive: [
      "/images/portfolio/portal-biodiversidad/portal-biodiversidad-desktop-responsive.png",
      "/images/portfolio/portal-biodiversidad/portal-biodiversidad-mobile-responsive.png",
    ],
    listProcess: [
      {
        icon: "/icons/proceso-desarrollo/analisis-requisitos.png",
        title: "Identificación de Requisitos",
        description:
          "Colaboramos estrechamente con Sernanp para entender sus necesidades específicas y los objetivos del portal.",
      },
      {
        icon: "/icons/proceso-desarrollo/desing-system.png",
        title: "Diseño del Sistema",
        description:
          "Diseñamos un CMS que no solo fuera fácil de usar, sino también escalable y seguro.",
      },
      {
        icon: "/icons/proceso-desarrollo/desarrollo-implementacion.png",
        title: "Desarrollo e Implementación",
        description:
          "Construimos el sistema utilizando las mejores prácticas de desarrollo, asegurando una integración fluida con el SMA.",
      },
      {
        icon: "/icons/proceso-desarrollo/pruebas.png",
        title: "Pruebas Rigurosas",
        description:
          "Realizamos pruebas exhaustivas para asegurar que el portal funcione correctamente y se integre perfectamente con otros sistemas.",
      },
      {
        icon: "/icons/proceso-desarrollo/despliegue-capacitacion.png",
        title: "Despliegue y Capacitación",
        description:
          "Implementamos el portal y capacitamos al personal de Sernanp para asegurar una transición sin problemas y un uso eficiente del sistema.",
      },
    ],
    more: [
      {
        icon: "/icons/mas-sobre/desafios-soluciones.png",
        title: "Desafíos y Soluciones",
        description:
          "El principal desafío fue integrar los datos de biodiversidad con el SMA, asegurando coherencia y accesibilidad en tiempo real. Nuestro equipo superó esto mediante el uso de APIs robustas y un diseño de base de datos optimizado, asegurando que el sistema pudiera manejar grandes volúmenes de datos sin comprometer el rendimiento.",
        isList: false,
        items: [],
      },
      {
        icon: "/icons/mas-sobre/impacto.png",
        title: "Impacto Nacional",
        description:
          "El Portal de Biodiversidad facilita la accesibilidad y el intercambio de información crucial sobre la biodiversidad peruana, apoyando la investigación, la educación y la toma de decisiones en conservación. Este proyecto no solo demuestra nuestra capacidad para desarrollar soluciones tecnológicas avanzadas, sino también nuestro compromiso con la protección y preservación del medio ambiente en Perú.",
        isList: false,
        items: [],
      },
      {
        icon: "/icons/mas-sobre/resumen.png",
        title: "En resumen",
        description:
          "El Portal de Biodiversidad es un testimonio de cómo Bartech puede crear soluciones tecnológicas integrales que no solo satisfacen las necesidades de nuestros clientes, sino que también contribuyen significativamente a la conservación ambiental.",
        isList: false,
        items: [],
      },
    ],
    subtitle_2: "portfolio.portalSernanp.subtitle_2",
    captures: [
      {
        image:
          "/images/portfolio/portal-biodiversidad/portal-biodiversidad-capture-1.webp",
        alt: "portfolio.portalSernanp.captures.alt",
      },
      {
        image:
          "/images/portfolio/portal-biodiversidad/portal-biodiversidad-capture-2.webp",
        alt: "portfolio.portalSernanp.captures.alt",
      },
      {
        image:
          "/images/portfolio/portal-biodiversidad/portal-biodiversidad-capture-3.webp",
        alt: "portfolio.portalSernanp.captures.alt",
      },
      {
        image:
          "/images/portfolio/portal-biodiversidad/portal-biodiversidad-capture-4.webp",
        alt: "portfolio.portalSernanp.captures.alt",
      },
    ],
  },
  {
    title: "portfolio.sistemaElu.title",
    tag: "portfolio.sistemaElu.tag",
    client: "portfolio.sistemaElu.client",
    image: "/images/portfolio/bsc-eluc/bsc-eluc-fondo.webp",
    imagePortfolio: "/images/portfolio/bsc-eluc/bsc-eluc.webp",
    imageCover: "/images/portfolio/bsc-eluc/bsc-eluc.webp",
    backgroundImage: "/images/portfolio/bsc-eluc/bsc-eluc-portada.webp",
    endpoint: "electro-ucayali",
    technologies: "portfolio.sistemaElu.technologies",
    years: "portfolio.sistemaElu.years",
    techUsed: [
      {
        icon: "/icons/dot-net.png",
        name: "portfolio.sistemaElu.techUsed.tech1.name",
        description: "portfolio.sistemaElu.techUsed.tech1.description",
      },
      {
        icon: "/icons/angular.png",
        name: "portfolio.sistemaElu.techUsed.tech2.name",
        description: "portfolio.sistemaElu.techUsed.tech2.description",
      },
      {
        icon: "/icons/ms-sql.png",
        name: "portfolio.sistemaElu.techUsed.tech3.name",
        description: "portfolio.sistemaElu.techUsed.tech3.description",
      },
    ],
    aboutSystem1: "portfolio.sistemaElu.description1",
    aboutSystem2: "portfolio.sistemaElu.description2",
    imageResponsive: ["/images/portfolio/bsc-eluc/bsc-eluc-responsive.webp"],
    listProcess: [
      {
        icon: "/icons/proceso-desarrollo/analisis-requisitos.png",
        title: "Análisis de Requisitos",
        description:
          "Colaboramos estrechamente con ElectroUcayali para comprender sus necesidades específicas y los requisitos del sistema de Balanced Scorecard.",
      },
      {
        icon: "/icons/proceso-desarrollo/desing-system.png",
        title: "Diseño del Sistema",
        description:
          "Diseñamos una arquitectura modular que permite la fácil integración de nuevos indicadores y objetivos estratégicos, asegurando flexibilidad y adaptabilidad.",
      },
      {
        icon: "/icons/proceso-desarrollo/desarrollo-agil.png",
        title: "Desarrollo Ágil",
        description:
          "Utilizamos metodologías ágiles para desarrollar el sistema, involucrando a los usuarios clave en cada etapa del proceso para asegurar que el producto final cumpla con sus expectativas.",
      },
      {
        icon: "/icons/proceso-desarrollo/pruebas.png",
        title: "Integración y Pruebas",
        description:
          "Aseguramos una integración perfecta con los sistemas existentes de Electro Ucayali y realizamos pruebas exhaustivas para garantizar la funcionalidad, seguridad y rendimiento del sistema.",
      },
      {
        icon: "/icons/proceso-desarrollo/despliegue-capacitacion.png",
        title: "Despliegue y Capacitación",
        description:
          "Implementamos el sistema y proporcionamos capacitación a los empleados de ElectroUcayali para asegurar una transición sin problemas y un uso efectivo del nuevo sistema.",
      },
    ],
    more: [
      {
        icon: "/icons/mas-sobre/desafios-soluciones.png",
        title: "Desafíos y Soluciones",
        description:
          "El principal desafío fue crear un sistema que pudiera integrarse con los datos existentes de la empresa y ofrecer una interfaz intuitiva para la visualización de indicadores de desempeño. Superamos estos desafíos mediante el uso de APIs robustas y un diseño de interfaz centrado en el usuario.",
        isList: false,
        items: [],
      },
      {
        icon: "/icons/mas-sobre/impacto.png",
        title: "Caracteristicas clave del sistema",
        description: "",
        isList: true,
        items: [
          "Paneles de Control Personalizables.",
          "Análisis en Tiempo Real.",
          "Reportes Detallados rendimiento y el cumplimiento de los objetivos estratégicos.",
          "Alertas y Notificaciones.",
        ],
      },
      {
        icon: "/icons/mas-sobre/resumen.png",
        title: "Conclusión",
        description:
          "El desarrollo del Sistema de Balanced Scorecard es un ejemplo destacado de cómo Bartech puede crear soluciones tecnológicas personalizadas que mejoran la gestión del desempeño organizacional. Este proyecto demuestra nuestra capacidad para manejar proyectos complejos y entregar resultados que superen las expectativas del cliente, contribuyendo al éxito estratégico de la organización.",
        isList: false,
        items: [],
      },
    ],
    subtitle_2: "portfolio.sistemaElu.subtitle_2",
    captures: [
      {
        image: "/images/portfolio/bsc-eluc/bsc-eluc-capture-1.webp",
        alt: "portfolio.sistemaElu.captures.alt",
      },
      {
        image: "/images/portfolio/bsc-eluc/bsc-eluc-capture-2.webp",
        alt: "portfolio.sistemaElu.captures.alt",
      },
      {
        image: "/images/portfolio/bsc-eluc/bsc-eluc-capture-3.webp",
        alt: "portfolio.sistemaElu.captures.alt",
      },
    ],
  },
];

export const work = {
  oportunities: [
    {
      title: "Desarrollador de software",
      description:
        "Buscamos un desarrollador de software con capacidad para diseñar, implementar y mantener aplicaciones web y de escritorio, trabajando en conjunto con equipos multidisciplinarios.",
      funciones: [
        "Diseñar y desarrollar nuevas funcionalidades en aplicaciones existentes.",
        "Mantener y mejorar el rendimiento de los sistemas actuales.",
        "Implementar buenas prácticas de programación y control de versiones.",
        "Colaborar con el equipo de diseño y producto en la definición de requerimientos.",
        "Documentar procesos y desarrollos realizados.",
      ],
      value: "dev",
    },
    {
      title: "Practicante de Diseño",
      description:
        "Buscamos una diseñadora gráfica apasionada y creativa para unirse a nuestro equipo.",
      funciones: [
        "Diseñar contenido gráfico para redes sociales.",
        "Edición de fotos y retoque digital.",
        "Apoyar en la creación de materiales para campañas publicitarias.",
        "Colaborar con el equipo de marketing en la definición de piezas gráficas.",
        "Realizar otras actividades según los requerimientos del área.",
      ],
      value: "design",
    },
    {
      title: "Practicante de Marketing",
      description:
        "Estamos en la búsqueda de un practicante de marketing proactivo, con interés en estrategias digitales, comunicación y gestión de campañas.",
      funciones: [
        "Apoyar en la planificación y ejecución de campañas de marketing digital.",
        "Monitorear redes sociales y realizar reportes de métricas.",
        "Investigar tendencias de mercado y analizar la competencia.",
        "Apoyar en la redacción de contenido para diferentes canales.",
        "Colaborar con las áreas de diseño y ventas en iniciativas conjuntas.",
      ],
      value: "marketing",
    },
    {
      title: "Practicante de Backend",
      description:
        "Se busca practicante de backend con interés en programación, bases de datos y arquitectura de software para apoyar en proyectos internos.",
      funciones: [
        "Desarrollar y mantener servicios y APIs.",
        "Dar soporte en la integración de sistemas y aplicaciones.",
        "Colaborar en el diseño de modelos de datos.",
        "Optimizar consultas y procesos en bases de datos.",
        "Documentar procesos técnicos y buenas prácticas.",
      ],
      value: "backend",
    },
  ],
};

export const menu: MenuType[] = [
  {
    label: "label.home",
    href: "/",
    isActive: false,
  },
  {
    label: "label.about",
    href: "/about",
    isActive: false,
  },
  {
    label: "label.services",
    href: "/services",
    isActive: false,
    showOnMobile: true,
    children: services.map((item) => ({
      label: item.title,
      href: `/services/${item.endpoint}`,
    })),
  },
  {
     label: "label.blog",
     href: "/blog",
     isActive: false,
  },
  {
    label: "label.portfolio",
    href: "/portfolio",
    isActive: false,
  },
  {
    label: "label.work_with_us",
    href: "/work-with-us",
    isActive: false,
  },
  {
    label: "label.contact_us",
    href: "/contact-us",
    isActive: false,
    isSolid: true,
    showOnMobile: true,
  },
];

export const testimonials = [
  {
    name: "home.testimonials.items.testimonial_1.name",
    post: "home.testimonials.items.testimonial_1.post",
    description: "home.testimonials.items.testimonial_1.description",
    image: "/images/clientes/client_1.webp",
  },
  {
    name: "home.testimonials.items.testimonial_2.name",
    post: "home.testimonials.items.testimonial_2.post",
    description: "home.testimonials.items.testimonial_2.description",
    image: "/images/clientes/client_2.webp",
  },
  {
    name: "home.testimonials.items.testimonial_3.name",
    post: "home.testimonials.items.testimonial_3.post",
    description: "home.testimonials.items.testimonial_3.description",
    image: "/images/clientes/client_3.webp",
  },
  {
    name: "home.testimonials.items.testimonial_4.name",
    post: "home.testimonials.items.testimonial_4.post",
    description: "home.testimonials.items.testimonial_4.description",
    image: "/images/clientes/client_4.webp",
  },
  {
    name: "home.testimonials.items.testimonial_5.name",
    post: "home.testimonials.items.testimonial_5.post",
    description: "home.testimonials.items.testimonial_5.description",
    image: "/images/clientes/client_5.webp",
  },
];

export const responsabilities = {
  title: {
    first: "about.responsabilities.title.first",
    second: "about.responsabilities.title.second",
  },
  items: [
    {
      title: "about.responsabilities.items.item1.title",
      description: "about.responsabilities.items.item1.description",
      icon: "/images/about/responsabilities/technological-education-programs.png",
    },
    {
      title: "about.responsabilities.items.item2.title",
      description: "about.responsabilities.items.item2.description",
      icon: "/images/about/responsabilities/telework-and-work-flexibility.png",
    },
    {
      title: "about.responsabilities.items.item3.title",
      description: "about.responsabilities.items.item3.description",
      icon: "/images/about/responsabilities/corporate-volunteering.png",
    },
    {
      title: "about.responsabilities.items.item4.title",
      description: "about.responsabilities.items.item4.description",
      icon: "/images/about/responsabilities/inclusion.png",
    },
    {
      title: "about.responsabilities.items.item5.title",
      description: "about.responsabilities.items.item5.description",
      icon: "/images/about/responsabilities/commitments-to-the-community.png",
    },
  ],
};

export const benefits = [
  {
    title: "work.benefits.items.item1.title",
    description: "work.benefits.items.item1.description",
  },
  {
    title: "work.benefits.items.item2.title",
    description: "work.benefits.items.item2.description",
  },
  {
    title: "work.benefits.items.item3.title",
    description: "work.benefits.items.item3.description",
  },
  {
    title: "work.benefits.items.item4.title",
    description: "work.benefits.items.item4.description",
  },
  {
    title: "work.benefits.items.item5.title",
    description: "work.benefits.items.item5.description",
  },
];
