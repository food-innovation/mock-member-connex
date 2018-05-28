FROM node:10-alpine
MAINTAINER david.sag@industrie.co

WORKDIR /cyberglue/member-connex/mock-server

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY src src
COPY index.js index.js

EXPOSE 9000
ENTRYPOINT ["npm" , "start" ]
