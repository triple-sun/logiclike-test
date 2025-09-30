# Build Stage
FROM node:slim AS build

# Add non-root user
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup

WORKDIR /app

# Copy only necessary files first
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci
# Copy source code
COPY . .

RUN npx prisma generate

RUN npm run build

# Production Stage
FROM node:slim

RUN apt-get update && apt-get install -y openssl wget

# Add non-root user
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup

WORKDIR /app

COPY --from=build --chown=appuser:appgroup /app/dist ./dist
COPY --from=build --chown=appuser:appgroup /app/scripts ./scripts
COPY --from=build --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=build --chown=appuser:appgroup /app/package*.json ./
COPY --from=build --chown=appuser:appgroup /app/prisma ./prisma

# Switch to non-root user
USER appuser

EXPOSE ${API_PORT}

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${API_PORT}/health || exit 1

CMD ["npm", "run", "start:prod"] 