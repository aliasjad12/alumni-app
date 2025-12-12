FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Install serve globally
RUN npm install -g serve

EXPOSE 3000

# Correct serve command for Node 20
CMD ["serve", "-s", "build", "-l", "3000"]
