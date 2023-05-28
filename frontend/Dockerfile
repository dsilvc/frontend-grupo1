FROM node:16-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app
COPY . .
RUN npm install
RUN npm update
CMD ["npm", "start"] 