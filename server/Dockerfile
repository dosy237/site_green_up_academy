FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Ensure the uploads directory exists
RUN mkdir -p uploads

EXPOSE 4000

CMD ["npm", "start"]
