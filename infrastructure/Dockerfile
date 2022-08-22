FROM node:14.16.0 as base
WORKDIR /usr/src/app

FROM base as builder

COPY package.json ./
RUN npm install

COPY . .
FROM builder

CMD ["npm", "run", "build"]
CMD ["node", "lib/local.js"]
