FROM node:18.16.0

RUN apt update

COPY package.json .

RUN npm install

COPY . . 

EXPOSE 8080

ENTRYPOINT [ "npm", "run", "dev" ]