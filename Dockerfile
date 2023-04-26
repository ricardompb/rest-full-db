FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["knex", "knex migrate:up --env production"]

CMD ["node", "src/server.js"]
