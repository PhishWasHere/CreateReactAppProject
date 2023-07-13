//tried to use ts, but cant import and cant be bothered

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const routes = require('./routes/index');


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const sess = {
  secret: 'Super secret secret', //env this later
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/craproject',
    ttl: 60 * 60 * 1000,
  }),
};

app.use(session(sess));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

  
// Call the async function to start the server
  startApolloServer();


