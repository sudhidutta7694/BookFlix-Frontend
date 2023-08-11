#use the node image from Official Docker Hub
FROM node:20.5.1-alpine3.17 as build-stage

WORKDIR /app

# Copy package.json and package-lock.json for backend
COPY package*.json ./

# Install backend dependencies
RUN npm ci

# Copy everything for backend
COPY . .

# Build frontend (if applicable)
RUN npm run build

# Expose the necessary ports
EXPOSE 3000

# Start the backend (using nodemon or node)
CMD ["node", "server.js"]

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]