FROM node:12.14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production

COPY . .

EXPOSE ${APP_PORT}

CMD ["npm", "start"]
