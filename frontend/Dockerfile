FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Install serve globally
RUN npm install -g serve

EXPOSE 3000

# Start serve on all interfaces
CMD ["serve", "-s", "build", "-l", "0.0.0.0:3000"]
