FROM node:lts-alpine3.10

WORKDIR /usr/app

RUN npx rimraf node_modules dist

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build

COPY ./.env ./dist/

EXPOSE 8000

CMD yarn start