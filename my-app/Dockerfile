#Stage 1
# pull official base image
FROM node:13.12.0-alpine

# set working directory
RUN mkdir -p frontendapp
WORKDIR /frontendapp


# install app dependencies
COPY package.json /frontendapp
COPY package-lock.json /frontendapp

RUN npm install

# add app
COPY . /frontendapp

EXPOSE 3000

# start app
CMD ["npm", "run", "start"]