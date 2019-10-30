FROM node
WORKDIR /my-app
COPY . .
RUN npm install
CMD [ "npm", "start" ]