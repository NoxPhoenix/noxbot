FROM node:10.15-alpine
RUN apk --no-cache --update add bash git
RUN mkdir usr/src/app -p
WORKDIR /usr/src/app
COPY "package.json" .
RUN npm install
COPY . .
CMD node app.js