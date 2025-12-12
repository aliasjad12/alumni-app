FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Install serve globally
RUN npm install -g serve

EXPOSE 3000

# Set HOST and PORT environment variables
ENV PORT=3000
ENV HOST=0.0.0.0

# Start serve
CMD ["serve", "-s", "build"]
