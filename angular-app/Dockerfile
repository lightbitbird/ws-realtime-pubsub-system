FROM node:12.8.0-alpine as builder

WORKDIR /app
COPY ./package*.json /app/

RUN apk add --quiet bash && \
  yarn global add @angular/cli@8.0.6 && \
  yarn cache clean && \
  rm -rf /var/cache/* /tmp/*

RUN yarn install

COPY ./ /app/

RUN yarn run build --output-path=./dist/out

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/out /usr/share/nginx/html
