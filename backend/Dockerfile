FROM node:20.12.0

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . /app

RUN npm run build
EXPOSE 4000

CMD ["node", "dist/index.js"]