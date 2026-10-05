# Portfolio — Kevin Gomez

Portfolio personal construido con **Next.js 14**, **TypeScript**, **Tailwind CSS** y **GSAP**.

---

## 🚀 Setup inicial (paso a paso)

### 1. Requisitos previos
Asegurá tener instalado:
- [Node.js](https://nodejs.org/) versión **18 o superior**
- npm (viene con Node.js)

Verificá con:
```bash
node -v   # debe mostrar v18+
npm -v
```

### 2. Copiar este proyecto
Copiá toda esta carpeta a donde quieras tener el proyecto.

### 3. Instalar dependencias
Abrí una terminal dentro de la carpeta del proyecto y corré:
```bash
npm install
```
Esto instala Next.js, React, GSAP, Tailwind y todo lo demás.

### 4. Arrancar en desarrollo
```bash
npm run dev
```
Abrí tu navegador en: **http://localhost:3000**

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx          ← Fuentes, metadata, LangProvider
│   ├── page.tsx            ← Página principal (importa todas las secciones)
│   └── globals.css         ← Estilos base y variables CSS
│
├── components/
│   ├── sections/
│   │   ├── Hero.tsx        ← Sección inicial con animación GSAP
│   │   ├── About.tsx       ← Sobre mí + foto
│   │   ├── Studies.tsx     ← Estudios e idiomas
│   │   ├── Experience.tsx  ← Experiencia laboral
│   │   ├── Skills.tsx      ← Tech stack (lenguajes, frameworks, diseño)
│   │   ├── Projects.tsx    ← CRM-SAT + más proyectos
│   │   ├── DesignSection.tsx ← UI/UX y diseño gráfico
│   │   └── Contact.tsx     ← Formulario de contacto
│   └── ui/
│       ├── Navbar.tsx      ← Navbar fija con switch de idioma
│       └── Footer.tsx      ← Footer simple
│
├── data/
│   └── portfolio.ts        ← ⭐ TODOS tus datos (editar aquí)
│
├── hooks/
│   └── useGsap.ts          ← Hooks de animación GSAP (hero + reveal)
│
└── lib/
    └── LangContext.tsx     ← Sistema de idiomas ES/EN
```

---

## ✏️ Cómo personalizar

### Cambiar textos
Editá **`src/lib/LangContext.tsx`** → objeto `translations` para cambiar cualquier texto en español o inglés.

### Cambiar datos (experiencia, proyectos, etc.)
Editá **`src/data/portfolio.ts`** — está todo centralizado ahí.

### Agregar tu foto (sección About)
En `src/components/sections/About.tsx`, reemplazá el `<div>` placeholder por:
```tsx
import Image from 'next/image'
// ...
<Image src="/foto-kevin.jpg" alt="Kevin Gomez" width={208} height={208} className="object-cover w-full h-full" />
```
Colocá la foto en la carpeta `public/`.

### Agregar screenshots de proyectos
En cada sección de proyectos, reemplazá los `<div>` placeholder por:
```tsx
import Image from 'next/image'
<Image src="/projects/crm-sat.png" alt="CRM SAT" fill className="object-cover" />
```

### Cambiar colores
Los colores principales están en `tailwind.config.js` y en `globals.css` (variables CSS).

---

## 🏗️ Build para producción
```bash
npm run build
npm start
```

---

## 📦 Deploy recomendado
- **Vercel** (más fácil para Next.js): https://vercel.com
  1. Subí el proyecto a GitHub
  2. Importalo en Vercel
  3. Deploy automático en cada push

---

## 🔧 Tecnologías usadas
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js    | 14      | Framework React con SSR/SSG |
| TypeScript | 5       | Tipado estático |
| Tailwind CSS | 3    | Estilos utilitarios |
| GSAP       | 3.12    | Animaciones de scroll y hero |
| Lucide React | 0.263 | Iconos |
