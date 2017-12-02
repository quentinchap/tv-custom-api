ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8

RUN apk add --no-cache nodejs nodejs-npm

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .

# Bundle app source
COPY . .

EXPOSE 8245

COPY run.sh /usr/src/app
RUN chmod a+x /usr/src/app/run.sh

CMD [ "/usr/src/app/run.sh" ]
