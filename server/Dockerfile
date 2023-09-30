FROM node:18-alpine
#RUN apk --no-cache add wget
WORKDIR /app
COPY package*.json /app/
RUN npm ci

COPY . /app
RUN npm run build


EXPOSE 3000
USER node

# todo HEALTHCHECK

# todo use multi stage build to exclude devDependencies
CMD ["node","build/server.js"]