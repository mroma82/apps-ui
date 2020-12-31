# base ===============================
FROM nginx:1.13.3-alpine AS base

# clean up
RUN rm -rf /usr/share/nginx/html/*


# builder ============================
FROM romacode/angular-cli:10.2.1 AS builder

# build dependencies
WORKDIR /src
COPY package.json /src
RUN npm install

# build
ARG BUILDCONF
ARG APPVERSION
COPY . /src
RUN sed -i 's/X.X.X/'"${APPVERSION}"'/g' /src/app/app-version.ts
RUN ng build --configuration=${BUILDCONF} --output-path /app/dist
                
# final ==============================
FROM base AS final

# setup server
WORKDIR /app
COPY docker/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
