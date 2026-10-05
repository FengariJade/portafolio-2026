# ==============================================================================
# ETAPA 1: BUILDER (Compilacion del proyecto Angular)
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

ENV NODE_ENV=development

# Copiar manifiestos de dependencias
COPY package*.json ./

# Instalar dependencias (incluye devDependencies para compilar)
RUN npm ci

# Copiar archivos de configuracion y codigo fuente
COPY tsconfig*.json angular.json tailwind.config.js ./
COPY .postcssrc.json ./
COPY src/ ./src/
COPY public/ ./public/

# Compilar Angular en modo produccion (genera archivos prerrenderizados)
RUN npm run build

# ==============================================================================
# ETAPA 2: PRODUCTION (Servidor Nginx con archivos estaticos)
# ==============================================================================
FROM nginx:alpine AS production

# Eliminar la configuracion por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuracion personalizada para SPA (Single Page Application)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estaticos prerrenderizados desde la etapa builder.
# Angular 20 con application builder genera la salida en dist/<nombre>/browser/
COPY --from=builder /usr/src/app/dist/front-tracking-app/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
