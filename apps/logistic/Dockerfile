#Build stage
FROM node:19-alpine as builder
RUN npm i -g pnpm
WORKDIR /app
ADD . /app
COPY package.json .
RUN pnpm i
RUN pnpm build logistic

#Production stage
FROM node:19-alpine
EXPOSE 3000
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/logistic ./dist

CMD [ "node", "dist/main.js" ]