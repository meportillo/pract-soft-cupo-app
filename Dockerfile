FROM node:14.19-alpine

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/

RUN npm install --silent

COPY . /usr/src/app/
# start app
CMD ["npm", "start"]
