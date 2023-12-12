FROM node:20.9-bullseye AS builder

WORKDIR /usr/src/app

COPY . .

## Update npm to latest version
RUN npm i -g pnpm typescript pm2

## Install packages
RUN pnpm i --frozen-lockfile

RUN pnpm build

FROM builder 

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/package.json /usr/src/app/pnpm-lock.yaml ./
COPY --from=builder /usr/src/app/process.example.json ./
COPY --from=builder /usr/src/app/build ./build

COPY process.example.json process.json

## Install packages
RUN pnpm i --frozen-lockfile

EXPOSE 4554

ENTRYPOINT [ -d "node_modules" ] && pm2-runtime process.json || pnpm i --frozen-lockfile && pm2-runtime process.json