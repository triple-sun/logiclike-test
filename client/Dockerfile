FROM node:slim AS build


# Add non-root user
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup

WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

COPY tsconfig.*.json ./

# Install app dependencies
RUN npm i

# Bundle app source
COPY . .

RUN npm run build

FROM node:slim

# Add non-root user
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup

COPY --from=build /app/node_modules ./node_modules
COPY --chown=appuser:appgroup --from=build /app/package*.json ./
COPY --chown=appuser:appgroup --from=build /app/dist ./dist

RUN npm i -g serve

# Expose the port on which the app will run
EXPOSE ${VITE_PORT}

# Serve the app
CMD [ "serve", "-s", "dist" ]
