FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000

# Bind to all interfaces so EC2 public IP works
CMD ["serve", "-s", "build", "-l", "3000", "-H", "0.0.0.0"]
