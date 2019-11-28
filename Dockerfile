# Change latest to your desired node version (https://hub.docker.com/r/library/node/tags/)
# NOTE: We use a single Dockerfile to build development and production environments
#
# manually build Docker image
# ➔ docker build -t sharepointoscar/zspharmaliteratureapp:test  -f Dockerfile --build-arg NODE_ENV=development .
#
#
# manually run image using port on any ip address on local host.
# using the image ID as last parameter
#
# docker run --rm -it -p 1337:1337 17e7f6e16553
#
#
FROM node:8.5.0

LABEL Oscar Medina <me@sharepointoscar.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Set required environment where app will run
ENV NODE_ENV=${NODE_ENV}
ENV PORT ${PORT}

ENV MONGODB_HOST=${MONGODB_HOST}
ENV MONGODB_PORT=${MONGODB_PORT}
ENV MONGODB_URI=${MONGO_URI}
#RUN npm install -g grunt-cli
#RUN npm install -g bower

#RUN echo '{ "allow_root": true }' > /root/.bowerrc

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

#RUN bower install --allow-root
#RUN grunt build

EXPOSE 80

CMD [ "npm", "start" ]
