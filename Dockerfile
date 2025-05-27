# -------- Build Stage --------

FROM node:22-alpine AS build

# Set the working directory
WORKDIR /app

# Copy only package files first for caching
COPY package.json package-lock.json ./

RUN npm ci --ignore-scripts

# Then copy only necessary source files
COPY index.html .
COPY public ./public
COPY src ./src
COPY vite.config.* tsconfig.* ./

# Accept build-time env var
ARG VITE_HOST_API
ENV VITE_HOST_API=${VITE_HOST_API}

# Build the app
RUN VITE_HOST_API=$VITE_HOST_API npm run build

# -------- Run Stage --------
FROM nginx:alpine

# Clean default nginx html directory
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
