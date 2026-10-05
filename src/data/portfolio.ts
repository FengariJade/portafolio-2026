import { newProjects } from './newProjects'

// Studies
export const studies = [
  {
    title: 'Secundaria (Argentina) / High School (Argentina)',
    place: 'Escuela Carlos Guido y Spano 625 Rosario - Titulo Tecnico en Multimedia, Arte y Diseno',
    period: '2015 - 2021',
  },
  {
    title: 'AntSolutions',
    place: 'Desarrollador Front-End en AntSolutions / Front-End Developer at AntSolutions',
    period: '2022 - 2023',
  },
  {
    title: 'Facultad / University',
    place: 'Escuela Superior de Diseno Rosario / Rosario Design School',
    period: '2021 - 2023',
  },
]

// Experience
export const experiences = [
  {
    company: 'Bartech',
    descEs: 'Desarrollador frontend y disenador UI/UX especializado en la creacion de aplicaciones web modernas, escalables y centradas en la experiencia del usuario. Con dominio de Angular, React y TypeScript, construyo interfaces complejas que combinan arquitectura solida con diseno intuitivo.',
    descEn: 'Frontend developer and UI/UX designer specialized in modern, scalable, user-centric web applications. Using Angular, React and TypeScript, I build complex interfaces combining solid architecture with intuitive design.',
    period: '26/3/2025 - Present',
    tag: 'current',
  },
  {
    company: 'PuertosOnline',
    descEs: 'Desarrollo de aplicaciones web de gestion empresarial, abarcando el diseno y la implementacion frontend con Angular. Codigo estructurado bajo arquitecturas escalables y sostenibles, integracion de APIs REST. Diseno responsivo adaptado a multiples dispositivos.',
    descEn: 'Development of business management web apps, covering design and frontend implementation with Angular. Structured code under scalable architectures, REST API integration, responsive design across devices.',
    period: '10/9/2023 - 15/3/2024',
    tag: 'job',
  },
  {
    company: 'CerealNet',
    descEs: 'Diseno y reconstruccion de paginas web y aplicaciones con codigo escalable y sostenible, adaptadas a multiples dispositivos y optimizadas para motores de busqueda.',
    descEn: 'Design and reconstruction of websites and apps with scalable, sustainable code, adapted to multiple devices and optimized for search engines.',
    period: '29/10/2024+',
    tag: 'freelance',
  },
  {
    company: 'Vape Station',
    descEs: 'Empresa lider en el rubro del vapeo. Responsable del desarrollo de piezas graficas para redes sociales, banners web, carteles promocionales y montajes fotograficos de producto.',
    descEn: 'Leading vaping company. Responsible for developing graphic pieces for social media, web banners, promotional posters and product photo compositions.',
    period: '1/9/2024 - 1/2/2025',
    tag: 'freelance',
  },
  {
    company: 'Food Prime',
    descEs: 'Empresa del rubro de comida rapida. Responsable del desarrollo de piezas graficas para redes sociales, material impreso, identidad de marca y otros requerimientos visuales.',
    descEn: 'Fast food company. Responsible for graphic pieces for social media, print materials, brand identity and other visual requirements.',
    period: '13/5/2024',
    tag: 'freelance',
  },
]

// Skills
export const skills = {
  languages: ['HTML 5', 'CSS 3', 'JavaScript', 'TypeScript'],
  frameworks: ['Angular', 'React', 'Next.js', 'Vue', 'Astro', 'Tailwind CSS', 'Bootstrap', 'GSAP'],
  design: ['Framer', 'Figma', 'Photoshop', 'Illustrator'],
  others: ['WordPress'],
}

type CaseStudyFields = {
  ctaEs: string
  ctaEn: string
  problemEs: string
  problemEn: string
  roleEs: string
  roleEn: string
  solutionEs: string
  solutionEn: string
  resultEs: string
  resultEn: string
}

export const featuredProject: {
  name: string
  url: string
  image: string
  techStack: string[]
  descEs: string
  descEn: string
  quoteEs: string
  quoteEn: string
} & CaseStudyFields = {
  name: 'CRM-SAT',
  url: '/projects/crm-sat',
  ctaEs: 'Ver case study',
  ctaEn: 'View case study',
  image: '/image/projects/crm-sat.webp',
  techStack: ['Angular 19', 'TypeScript', 'Tailwind CSS', 'RxJS', 'WebSockets', 'REST API'],
  descEs: 'Desarrollo frontend completo de una plataforma CRM omnicanal empresarial. Disene y construi desde cero la interfaz de usuario, priorizando una experiencia visual moderna, limpia e intuitiva. La aplicacion centraliza la comunicacion con clientes a traves de multiples canales simultaneos: WhatsApp, Telegram, chat en vivo, correo electronico y llamadas telefonicas.',
  descEn: 'Complete frontend development of an enterprise omnichannel CRM platform. I designed and built the UI from scratch, prioritizing a modern, clean, and intuitive visual experience. The app centralizes customer communication through multiple simultaneous channels: WhatsApp, Telegram, live chat, email, and phone calls.',
  problemEs: 'El reto era convertir una operacion omnicanal compleja en una interfaz clara, rapida de interpretar y comoda para equipos que gestionan conversaciones, tickets y seguimiento comercial en paralelo.',
  problemEn: 'The challenge was turning a complex omnichannel operation into a clear interface that was fast to read and comfortable for teams handling conversations, tickets, and sales follow-up in parallel.',
  roleEs: 'Me encargue del frontend completo: arquitectura visual, diseno de interfaz, jerarquia de informacion, componentes y experiencia de uso diaria.',
  roleEn: 'I owned the full frontend: visual architecture, interface design, information hierarchy, components, and the day-to-day user experience.',
  solutionEs: 'Organice la plataforma con una UI limpia, modulos consistentes y flujos pensados para reducir friccion al alternar entre canales, clientes y estados de atencion.',
  solutionEn: 'I structured the platform with a clean UI, consistent modules, and flows designed to reduce friction when switching between channels, customers, and support states.',
  resultEs: 'El resultado fue una experiencia mas moderna y entendible para una herramienta con mucha densidad funcional, sin perder potencia operativa.',
  resultEn: 'The result was a more modern and understandable experience for a highly functional tool, without sacrificing operational power.',
  quoteEs: 'CRM-SAT desafio mis capacidades tecnicas y mi criterio de diseno: construir algo poderoso que se sintiera simple. Cada decision apunto siempre al usuario del otro lado de la pantalla.',
  quoteEn: 'CRM-SAT challenged my technical skills and design judgment: building something powerful that still felt simple. Every decision aimed at the user on the other side of the screen.',
}

export const moreProjects: Array<{
  name: string
  url: string
  image: string
  stack: string[]
  descEs: string
  descEn: string
  quoteEs: string
  quoteEn: string
} & CaseStudyFields> = [
  ...newProjects,
  {
    name: 'FLOTEX',
    url: '/projects/flotex',
    ctaEs: 'Ver case study',
    ctaEn: 'View case study',
    image: '/image/projects/flotex.webp',
    stack: ['Angular', 'Tailwind CSS', 'TypeScript'],
    descEs: 'App de tracking de camiones en tiempo real con gestion de conductores, seguimiento de rutas y creacion de paquetes para el transporte de productos.',
    descEn: 'Real-time truck tracking app with driver management, route tracking, and package creation for product transport.',
    problemEs: 'Habia que mostrar mucha informacion operativa en tiempo real sin volver pesada la lectura: ubicacion, rutas, conductores y estado logistico.',
    problemEn: 'The product needed to show a lot of real-time operational information without making it hard to read: location, routes, drivers, and logistics status.',
    roleEs: 'Trabaje en el frontend de la plataforma, priorizando claridad visual, lectura rapida y consistencia entre paneles y herramientas de seguimiento.',
    roleEn: 'I worked on the platform frontend, prioritizing visual clarity, fast scanning, and consistency across tracking panels and tools.',
    solutionEs: 'Disene una interfaz orientada a control operativo, con jerarquias claras y vistas que ayudan a entender el estado de la flota de un vistazo.',
    solutionEn: 'I designed an operations-focused interface with clear hierarchy and views that help users understand fleet status at a glance.',
    resultEs: 'Se logro una experiencia mas ordenada para una app compleja, capaz de sostener seguimiento continuo y toma de decisiones rapida.',
    resultEn: 'The result was a more organized experience for a complex app, able to support continuous tracking and fast decision-making.',
    quoteEs: 'Flotex es uno de esos proyectos que crecen con uno. Gestion de flotas, scanners moviles e integracion con APIs REST: un ecosistema completo que se adapto a multiples contextos de trabajo.',
    quoteEn: 'Flotex is one of those projects that grows with you. Fleet management, mobile scanners, and REST API integration: a complete ecosystem that adapted to multiple work contexts.',
  },
  {
    name: 'BARTECH FIELD',
    url: '/projects/bartech-field',
    ctaEs: 'Ver case study',
    ctaEn: 'View case study',
    image: '/image/projects/bartech-field-ej.webp',
    stack: ['Angular 20', 'Field logistics', 'Dashboards', 'Mock data'],
    descEs: 'Sistema interno para gestion de proyectos de campo, sedes, cuadrillas, manifiestos, monitoreo operativo y planificacion de rutas dentro de una sola interfaz.',
    descEn: 'Internal platform for managing field projects, venues, crews, manifests, operational monitoring, and route planning inside a single interface.',
    problemEs: 'El producto debia concentrar mucha operacion real en un solo sistema sin perder claridad: proyectos, monitoreo, rutas, sedes y seguimiento de cuadrillas.',
    problemEn: 'The product needed to bring a large amount of real operational work into one system without losing clarity: projects, monitoring, routes, venues, and crew follow-up.',
    roleEs: 'Trabaje en el frontend y en la organizacion visual del producto para que equipos de logistica, supervision y coordinacion pudieran navegar procesos complejos con menos friccion.',
    roleEn: 'I worked on the frontend and on the products visual organization so logistics, supervision, and coordination teams could navigate complex processes with less friction.',
    solutionEs: 'La interfaz se estructuro en modulos y vistas especializadas para dashboard, monitoreo por estados, proyectos activos y planificacion espacial de rutas.',
    solutionEn: 'The interface was structured into modules and specialized views for dashboards, status-based monitoring, active projects, and spatial route planning.',
    resultEs: 'El resultado fue una base visual solida para un sistema interno de alta complejidad, lista para control, seguimiento y toma de decisiones.',
    resultEn: 'The result was a solid visual foundation for a highly complex internal system, ready for control, follow-up, and decision-making.',
    quoteEs: 'Bartech Field exigio pensar mas alla de una sola pantalla: habia que conectar operaciones, equipos, sedes y tiempos en una experiencia coherente.',
    quoteEn: 'Bartech Field required thinking beyond a single screen: operations, teams, venues, and timelines all had to connect inside one coherent experience.',
  },
  {
    name: 'NOUZ - INTRANET',
    url: '/projects/nouz-intranet',
    ctaEs: 'Ver case study',
    ctaEn: 'View case study',
    image: '/image/projects/nouz-intranet.webp',
    stack: ['Angular', 'Tailwind CSS', 'TypeScript'],
    descEs: 'Panel interno del servicio NOUZ donde los usuarios gestionan su dia a dia: calendarios, notas, recordatorios y tareas desde una interfaz limpia y ordenada.',
    descEn: 'Internal panel for the NOUZ service where users manage daily life: calendars, notes, reminders, and tasks from a clean, organized interface.',
    problemEs: 'El reto era hacer que una intranet de productividad se sintiera ligera, util y atractiva, sin parecer una herramienta fria o burocratica.',
    problemEn: 'The challenge was making a productivity intranet feel light, useful, and attractive instead of cold or bureaucratic.',
    roleEs: 'Me enfoque en el frontend y en traducir funcionalidades cotidianas a una experiencia visual mas amable y ordenada.',
    roleEn: 'I focused on the frontend and on translating everyday features into a friendlier, more organized visual experience.',
    solutionEs: 'Construi una interfaz limpia y modular para tareas, notas, recordatorios y calendario, buscando que cada bloque se entendiera sin esfuerzo.',
    solutionEn: 'I built a clean, modular interface for tasks, notes, reminders, and calendar flows, aiming for effortless comprehension across the product.',
    resultEs: 'Se logro una herramienta interna mas cercana y usable, capaz de integrar funciones del dia a dia con una narrativa visual coherente.',
    resultEn: 'The result was a more approachable and usable internal tool, capable of integrating everyday features with a coherent visual narrative.',
    quoteEs: 'NOUZ Intranet fue un experimento genuino: explorar como integrar IA en tareas cotidianas de forma natural. Termine usandola yo mismo durante el desarrollo.',
    quoteEn: 'NOUZ Intranet was a genuine experiment: exploring how to integrate AI into everyday tasks naturally. I ended up using it myself during development.',
  },
  {
    name: 'BARTECH',
    url: '/projects/bartech',
    ctaEs: 'Ver case study',
    ctaEn: 'View case study',
    image: '/image/projects/bartech.webp',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'next-international'],
    descEs: 'Sitio corporativo de Bartech orientado a presentar servicios, portafolio y propuesta de valor con una narrativa institucional clara y una presencia visual fuerte.',
    descEn: 'Bartech corporate website focused on presenting services, portfolio, and value proposition with a clear institutional narrative and a strong visual presence.',
    problemEs: 'Habia que mostrar muchas capacidades tecnicas sin saturar la lectura ni perder el tono corporativo y confiable de la marca.',
    problemEn: 'The challenge was presenting many technical capabilities without overwhelming the layout or losing the brands corporate and trustworthy tone.',
    roleEs: 'Me encargue del frontend y de la estructura visual del sitio para que la propuesta comercial se sintiera solida, clara y escalable.',
    roleEn: 'I handled the frontend and visual structure so the commercial proposition would feel solid, clear, and scalable.',
    solutionEs: 'Ordene home, servicios y portafolio como un recorrido de confianza, combinando jerarquia visual, contenido comercial y una experiencia bilingue consistente.',
    solutionEn: 'I organized the home, services, and portfolio as a trust-building journey, combining visual hierarchy, commercial content, and a consistent bilingual experience.',
    resultEs: 'El resultado fue una web institucional mas madura y convincente, capaz de comunicar expertise sin volverse rigida.',
    resultEn: 'The result was a more mature and convincing corporate website, able to communicate expertise without becoming rigid.',
    quoteEs: 'Bartech me dejo trabajar el lado mas estrategico del frontend: no solo construir pantallas, sino ordenar un discurso comercial completo.',
    quoteEn: 'Bartech let me work on the more strategic side of frontend: not just building screens, but shaping a full commercial narrative.',
  },
  {
    name: 'NOUZ - WEBSITE',
    url: '/projects/nouz-website',
    ctaEs: 'Ver case study',
    ctaEn: 'View case study',
    image: '/image/projects/nouz1.webp',
    stack: ['Angular 20', 'TypeScript', 'Bootstrap', 'GSAP'],
    descEs: 'Landing page de producto para NOUZ, una app de productividad personal. El reto fue hacer que una herramienta de gestion se sintiera deseable.',
    descEn: 'Product landing page for NOUZ, a personal productivity app. The challenge was making a management tool feel desirable.',
    problemEs: 'Habia que vender una herramienta de gestion, un tipo de producto que normalmente cuesta volver aspiracional o memorable.',
    problemEn: 'The goal was to sell a management tool, the kind of product that is usually difficult to make feel aspirational or memorable.',
    roleEs: 'Me ocupe del frontend y de la construccion de una narrativa visual que hiciera atractiva la propuesta desde la primera pantalla.',
    roleEn: 'I handled the frontend and built a visual narrative that made the product feel attractive from the very first screen.',
    solutionEs: 'Combine estructura comercial, secciones progresivas y animacion para sostener atencion y reforzar el mensaje del producto.',
    solutionEn: 'I combined commercial structure, progressive sections, and motion to hold attention and reinforce the product message.',
    resultEs: 'Se consiguio una landing con mas impacto visual y mejor capacidad de presentar valor, beneficios y cierre comercial.',
    resultEn: 'The final result was a landing page with stronger visual impact and better ability to present value, benefits, and commercial closure.',
    quoteEs: 'NOUZ Website fue el proyecto donde el diseno tuvo mas peso que la logica. Demostro que una buena landing no solo presenta un producto, tambien hace que lo sientas necesario.',
    quoteEn: 'NOUZ Website was the project where design outweighed logic. It proved that a great landing page does not just present a product, it makes it feel necessary.',
  },
]

// UI/UX Design
export const uiuxProjects = [
  {
    name: 'Ewallu',
    descEs: 'Prototipo completo en Figma de una app movil de turismo comunitario que conecta viajeros con comunidades locales. Permite explorar destinos, compartir experiencias, dejar resenas y descubrir la cultura de cada lugar. El flujo cubre desde el onboarding hasta el social feed, escaneo QR y perfil del usuario.',
    descEn: 'Complete Figma prototype of a community tourism mobile app connecting travelers with local communities. Explore destinations, share experiences, leave reviews, and discover local culture. The flow covers onboarding through social feed, QR scanning, and user profile.',
  },
  {
    name: 'Go Play',
    descEs: 'Prototipo completo de una app movil deportiva que resuelve el clasico problema de que alguien falte al partido. Go Play permite encontrar y contratar jugadores disponibles, reservar canchas, gestionar pagos y calificar a quienes juegan contigo.',
    descEn: 'A complete prototype of a sports mobile app that solves the classic problem of someone missing a match. Go Play allows users to find and hire available players, book courts, manage payments, and rate teammates.',
  },
]
