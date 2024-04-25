## Next.js Project Manager

This is an updated version of the orignial [bootcamp graduation project](https://github.com/PhishWasHere/CreateReactAppProject/tree/old). While this is an updated version, this is still more of a tech demo and a way for me to learn new tools, as such the css is minimal. 
</br>
This project uses: [PostgreSQL](https://www.postgresql.org/), [Prisma](https://www.prisma.io/), [Apollo](https://www.apollographql.com/), TypeScript, and [Next.js v13.4](https://nextjs.org)

<details>
<summary>Table of Contents</summary>
<ul>        
    <li><a href='#getting-started'>Getting Started</a></li>
    <li><a href="#setup">Setup</a></li>
    <li><a href="#known-bugs">Known Bugs</a></li>
    <li><a href="#license">License</a></li>
</details>

_______

## Getting Started

First, make sure you have PostgreSQL installed.
</br>
Once the db is installed, update the .env files with the api endpoints.
</br>
To start the dev server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000).


## Docker setup

If you would like to test this in a docker, use:
```bash
npm run docker
# or
yarn docker
# or
pnpm docker
# or
bun docker
```
(make sure the db api endpoint in the migrate.sh and docker-compose are correct)

## Known Bugs

This web-app can only be used with Chromium browsers due to its use of the DateTime-local HTML tag.
</br>
Creating too many task's will result in the "Edit Task" modal to appear off screen.
