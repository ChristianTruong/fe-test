FROM node:latest

WORKDIR /app/fe

COPY . .

RUN npm install

CMD ["npm", "start"]
