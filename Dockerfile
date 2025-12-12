FROM node:22-alpine

RUN npm i -g corepack@latest

RUN corepack enable pnpm

WORKDIR /usr/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

COPY . .

RUN apk add --no-cache openssl

RUN pnpm prisma generate

RUN pnpm build

EXPOSE 8080

CMD [ "pnpm", "start:prod" ]
