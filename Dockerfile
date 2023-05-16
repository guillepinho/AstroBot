FROM node:18.16.0

RUN apt update -y
RUN apt upgrade -y
RUN apt install ffmpeg -y

COPY package.json .

RUN npm install

COPY . . 

ENTRYPOINT [ "npm", "run", "dev" ]