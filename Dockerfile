# first stage of building docker react image
FROM node:alpine3.14 as build
RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

COPY . /app/
RUN npm run build --prod
#final stage
FROM nginx:alpine
COPY --from=build /app/ /usr/share/nginx/html
