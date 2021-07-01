FROM node:alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install
RUN npm install -g @angular/cli@12

COPY . /app

ARG configuration=dev
RUN ng build --configuration $configuration

FROM nginx:1.17.1-alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-step /app/dist/cid/ /usr/share/nginx/html

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 4200 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
