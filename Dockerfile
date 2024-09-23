FROM node:19
WORKDIR /app
RUN apt-get update -y && apt-get install -y git
COPY package.json .
RUN npm install
COPY . .
RUN npm cache clean --force # me when OKD moment
RUN rm -rf /.npm
RUN git config --system --add safe.directory '*' # me when more OKD moment
CMD ["npm", "start"]
