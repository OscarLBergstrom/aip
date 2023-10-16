FROM node:20.6.0

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY package-lock.json /app

RUN npm install 

# Bundle app source
COPY . /app

EXPOSE 3000

ENV GENERATE_SOURCEMAP=false

CMD ["npm","run","start"]