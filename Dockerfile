FROM node:18.18.0
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
COPY migrate.sh ./
RUN chmod +x migrate.sh
ENV HOST=0.0.0.0 PORT=3030 NODE_ENV=production DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres?schema=public API_URI=http://localhost:3030/api/apollo
EXPOSE 3030 5555
CMD ["./migrate.sh"] 