FROM node:slim AS build

# Create app directory
WORKDIR /usr/src/app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

COPY tsconfig.*.json ./

# Install app dependencies
RUN npm i

# Bundle app source
COPY . .

RUN npm run build

FROM node:slim

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/package*.json ./
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

RUN npm i -g serve

# Expose the port on which the app will run
EXPOSE ${VITE_PORT}

# Serve the app
CMD [ "serve", "-s", "dist" ]
