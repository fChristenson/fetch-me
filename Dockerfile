FROM alekzonder/puppeteer:latest

USER root

WORKDIR /app

COPY package.json /app
COPY npm-shrinkwrap.json /app
COPY ./dist-app/ /app

RUN npm install --production

EXPOSE 3000

CMD [ "node", "./server.js" ]
