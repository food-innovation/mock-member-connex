FROM node:10-alpine
MAINTAINER david.sag@industrie.co
RUN mkdir member-connex
WORKDIR member-connex
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm install
ADD src src
ADD index.js index.js
EXPOSE 9000
ENTRYPOINT ["npm" , "start" ]
