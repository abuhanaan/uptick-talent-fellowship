FROM node:18-alpine3.18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY ./src/ ./src/
COPY ./public/ ./public/

CMD ["npm","start"]