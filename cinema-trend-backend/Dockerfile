FROM node:18-alpine AS dependencies

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY prisma ./prisma
RUN yarn prisma generate

FROM dependencies AS builder

COPY . .

RUN yarn build

FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=dependencies /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=dependencies /app/node_modules/.prisma ./node_modules/.prisma

ENV NODE_ENV=production
ENV PORT=4200

EXPOSE 4200

CMD ["node", "dist/main"]
