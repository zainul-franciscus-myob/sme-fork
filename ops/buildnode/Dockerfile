# syntax = docker/dockerfile:1.0-experimental
FROM node:12-alpine

WORKDIR /app

# Preinstall node_modules
COPY package.json .
COPY yarn.lock .
RUN --mount=type=secret,id=npmrc,dst=/root/.npmrc yarn install

CMD /bin/sh
