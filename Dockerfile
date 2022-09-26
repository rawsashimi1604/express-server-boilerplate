FROM node:16.7

ARG EXPOSED_PORT=8080

# Environment variables
ENV BACKEND_PORT ${EXPOSED_PORT}
ENV POSTGRES_USER loowe
ENV POSTGRES_PASSWORD password123
ENV POSTGRES_HOST db
ENV POSTGRES_PORT 5432
ENV POSTGRES_DATABASE defaultdb
ENV FRONTEND_APP_URL_LOCAL http://localhost:5000
ENV FRONTEND_APP_URL https://poke-tcg-db.vercel.app

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app


