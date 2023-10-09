FROM node:16.3.0-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY package-lock.json /app

RUN npm install 

# Bundle app source
COPY . /app

EXPOSE 3001

CMD ["npm","run","start"]