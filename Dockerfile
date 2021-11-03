FROM node:16.13-alpine
WORKDIR /user/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
RUN npm run build
CMD ["node", "./built/server.js"]