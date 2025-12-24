# 1. Билдим зависимости и код
FROM node:22-alpine AS builder

WORKDIR /app

# Установим только package.json и lock файл для кеширования слоёв
COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

# Копируем исходники
COPY . .

# Билдим nestjs
RUN yarn build

# 2. Production image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Копируем только нужное
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Экспонируем порт
EXPOSE 3000

# Запускаем app
CMD ["yarn", "start"]

