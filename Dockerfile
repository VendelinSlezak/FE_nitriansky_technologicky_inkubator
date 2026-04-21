# --- Fáza 1: Spoločný základ ---
FROM node:lts-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# --- Fáza 2: Vývoj (Development) ---
FROM base AS development
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# --- Fáza 3: Zostavenie (Build) ---
FROM base AS build-stage
RUN npm run build

# --- Fáza 4: Produkcia (Nginx) ---
FROM nginx:stable-alpine AS production
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
