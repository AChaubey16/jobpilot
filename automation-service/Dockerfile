FROM mcr.microsoft.com/playwright:v1.45.3-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV HEADLESS=true

CMD ["npm", "start"]
