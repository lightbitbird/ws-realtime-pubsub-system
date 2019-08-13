FROM node:12.8.0-alpine

WORKDIR /module
COPY ./package*.json /module/

RUN apk add --quiet --no-cache bash && \
  yarn global add @angular/cli && \
  yarn cache clean && \
  rm -rf /var/cache/* /tmp/*

RUN yarn install

COPY ./ /module/

CMD ["node", "app"]

