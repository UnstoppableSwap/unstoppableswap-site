# Build stage
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM halverneus/static-file-server:latest
ENV FOLDER /app/dist
CMD ["/serve"]