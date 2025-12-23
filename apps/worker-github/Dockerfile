# Stage 1: Build
FROM node:20-slim AS builder
WORKDIR /app

# Installation des dépendances système nécessaires pour Prisma
RUN apt-get update && apt-get install -y openssl python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

# Génération du client Prisma (crucial pour l'accès DB)
RUN npx prisma generate --schema=libs/db/schema.prisma

# Build de l'application via NX
RUN npx nx build worker-github --prod

# Stage 2: Runtime
FROM node:20-slim
WORKDIR /app

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# On récupère le build et les node_modules nécessaires
COPY --from=builder /app/dist/apps/worker-github ./
COPY --from=builder /app/node_modules ./node_modules

# Variables d'environnement par défaut
ENV NODE_ENV=production

CMD ["node", "main.js"]