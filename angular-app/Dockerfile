FROM node:12.8.0-alpine as builder

WORKDIR /app
COPY ./package*.json /app/

RUN apk add --quiet bash && \
  yarn global add @angular/cli@8.0.6 && \
  yarn cache clean && \
  rm -rf /var/cache/* /tmp/*

RUN yarn install

COPY ./ /app/

EXPOSE 4200
