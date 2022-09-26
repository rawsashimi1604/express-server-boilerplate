FROM node:16.7

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app


