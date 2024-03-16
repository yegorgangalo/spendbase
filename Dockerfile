FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

EXPOSE 5005

CMD [ "npm", "run", "start:dev" ]