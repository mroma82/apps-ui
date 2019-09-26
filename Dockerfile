# base ===============================
FROM nginx:1.13.3-alpine AS base

# clean up
RUN rm -rf /usr/share/nginx/html/*


# builder ============================
FROM node:10 AS builder

# build dependencies
WORKDIR /app
RUN npm install -g @angular/cli@7.3.5
COPY package.json /app
RUN npm install

# build
ARG BUILDCONF
COPY . /app
RUN ng build --configuration=${BUILDCONF} --output-path /app/dist
                
# final ==============================
FROM base AS final

# setup server
WORKDIR /app
COPY docker/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
