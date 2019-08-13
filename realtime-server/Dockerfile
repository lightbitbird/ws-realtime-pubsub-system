FROM node:12.8.0-alpine

WORKDIR /sync
COPY ./package*.json /sync/

RUN apk add --quiet --no-cache bash && \
  yarn global add @angular/cli && \
  yarn cache clean && \
  rm -rf /var/cache/* /tmp/*

RUN yarn install

COPY ./ /sync/

CMD ["node", "app"]

