FROM node:19

WORKDIR /app

RUN npm install -g @vue/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]
