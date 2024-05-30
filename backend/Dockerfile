FROM node:20.11.1-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . /app

RUN npm run build
EXPOSE 4000

CMD ["node", "dist/index.js"]