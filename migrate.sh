#!/bin/sh
# Run migrations
DATABASE_URL="postgres://postgres:postgres@db:5432/postgres?schema=public" 

npx prisma migrate reset

npx prisma migrate dev --name init

# need to add seed data

npx prisma generate

npm run start