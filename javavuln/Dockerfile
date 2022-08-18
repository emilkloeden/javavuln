# Use a lighter version of Node as a parent image
FROM node:lts-alpine

WORKDIR /site

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "./build"]