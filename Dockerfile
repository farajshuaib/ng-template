# Stage 1: Build the Angular application
FROM node:20 AS build

WORKDIR /app

RUN npm install -g @angular/cli


COPY package*.json ./

RUN yarn install

COPY . .
RUN yarn build

# Stage 2: Serve the app with NGINX
FROM nginx:alpine


COPY --from=build /app/dist/ng-template/browser /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 5050
CMD ["nginx", "-g", "daemon off;"]
