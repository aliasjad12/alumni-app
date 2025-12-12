FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000

# Bind to all interfaces so EC2 public IP works
CMD ["npx", "serve", "-s", "build", "-l", "3000", "-n", "0.0.0.0"]
