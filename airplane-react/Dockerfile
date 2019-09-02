# => build container
FROM node:alpine as react-build

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build

# => run container
FROM nginx:alpine

# nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# static build
COPY --from=react-build /app/build /usr/share/nginx/html

# default port exposure
EXPOSE 80

# initialize environment variables into filesystem
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# wait-for-it
COPY ./wait-for-it.sh .

# Add bash
RUN apk add --no-cache bash

# run script which initializes env vars to fs
RUN chmod +x env.sh
# rUN ./env.sh

# start Nginx server
CMD ["/usr/share/nginx/html/wait-for-it.sh", "airplane-spring-boot:3001", "--", "/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]