FROM alekzonder/puppeteer:latest

COPY package.json /app
COPY npm-shrinkwrap.json /app
COPY ./dist-app/ /app

WORKDIR /app

RUN npm install --production

EXPOSE 3000

CMD [ "node", "./server.js" ]
