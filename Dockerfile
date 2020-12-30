# base ===============================
FROM nginx:1.13.3-alpine AS base

# clean up
RUN rm -rf /usr/share/nginx/html/*


# builder ============================
FROM node:10 AS builder

# build dependencies
WORKDIR /app
RUN npm install -g @angular/cli@10.2.1
COPY package.json /app
RUN npm install

# build
ARG BUILDCONF
ARG APPVERSION
COPY . /app
RUN sed -i 's/X.X.X/'"${APPVERSION}"'/g' src/app/app-version.ts
RUN ng build --configuration=${BUILDCONF} --output-path /app/dist
                
# final ==============================
FROM base AS final

# setup server
WORKDIR /app
COPY docker/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
