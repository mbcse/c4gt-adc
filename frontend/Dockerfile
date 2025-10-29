FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN VITE_API_URL="https://gyanseturohtak.in" npm run build

CMD ["npm", "start"]