FROM node:18.12-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm i -g yarn 

# COPY yarn.lock ./

RUN npm install --force

COPY . .

RUN npm run start:dev
# RUN npm run build

# FROM node:18.12-alpine as production

# # ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# # RUN npm i -g yarn 

# RUN npm install --force

# COPY . .

# COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/src/main"]