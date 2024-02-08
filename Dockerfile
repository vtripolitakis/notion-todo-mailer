# create a Dockerfile to use alpine - node 18 - install package.json depencencies and inject env variables then run node index.js

FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD [ "node", "index.js" ]
