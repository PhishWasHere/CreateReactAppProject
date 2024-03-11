FROM node:18.18.0
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build
ENV HOST=0.0.0.0 PORT=3030 NODE_ENV=production DATABASE_URL=postgresql://postgres:password@db:8081/mydb?schema=public API_URI=http://localhost:0000/api/apollo
EXPOSE 3030
CMD ["npm", "run", "start"]
