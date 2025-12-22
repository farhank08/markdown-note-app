# Build
FROM node:25-alpine AS builder

WORKDIR /app

# Copy dependency manifests first for caching
COPY package.json package-lock.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/

# Install all dependencies
RUN npm ci

# Copy the full source
COPY . .

# Build client and server
RUN npm run build

# Production runtime
FROM node:25-alpine

WORKDIR /app

# Copy only what is needed to run the app
COPY package.json package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/client/dist ./client/dist

# App listens on 3000
EXPOSE 3000

# Start the app (root npm start)
CMD ["npm", "start"]