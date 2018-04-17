FROM node:8.5.0

# Install Node Modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# Load in application code
WORKDIR /opt/app
ADD . /opt/app

# Start app
EXPOSE 5432
CMD ["npm", "run", "db:up:env"]
