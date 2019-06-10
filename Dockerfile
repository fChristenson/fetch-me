FROM alekzonder/puppeteer:latest

RUN npm install --production \
    npm run build

COPY ./dist-app /app

WORKDIR /app

EXPOSE 3000

CMD [ "node", "server.js" ]
