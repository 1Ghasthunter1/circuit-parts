FROM node:17.9.0
WORKDIR /packages/server
COPY package*.json ./
RUN npm install --production=false
RUN npm run build
RUN npm prune --production

COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]
