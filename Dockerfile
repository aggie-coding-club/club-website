FROM node:lts-alpine
WORKDIR /app
COPY src /app/src
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY tsconfig.json /app/tsconfig.json
RUN npm i
RUN npm run compile
RUN rm -r /app/src
RUN ls
CMD npm start