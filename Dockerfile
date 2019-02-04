FROM node:10.15-alpine
RUN apk --no-cache --update add bash git g++ make python
RUN mkdir usr/src/app -p
WORKDIR /usr/src/app
RUN npm install -g nodemon
COPY "package.json" .
RUN npm install
COPY . .
CMD npm run migrate && nodemon app.js -L