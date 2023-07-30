require('dotenv').config(); //allows use of .env file

/////////////////////////////// dependencies ///////////////////////////////
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const routes = require('./routes');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
/////////////////////////////// //////////// ///////////////////////////////

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true })); //allows use of req.body
app.use(express.json());
app.use(routes); //turn on routes

if (process.env.NODE_ENV === 'production') { //serve up static assets in production
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  try {
    await server.start();
    server.applyMiddleware({ app });


    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
      });
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}; 
// Call the async function to start the server
startApolloServer();