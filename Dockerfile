FROM node:10.16.0-alpine AS sme-web-build

WORKDIR /app

ARG NPM_TOKEN
COPY ops/.npmrc .
COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN rm -f .npmrc

FROM node:10.16.0-alpine

WORKDIR /app

COPY --from=sme-web-build /app .
COPY . .
