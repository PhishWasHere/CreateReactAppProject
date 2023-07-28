import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './utils/auth';

import Front from './pages/front';
import Home from './pages/home';
import Signup from './pages/signup/';
import Login from './pages/login';
import Nav from './components/NavBar';
import SingleProject from './pages/singleProject';
import Dev from './pages/dev';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex flex-col h-screen justify-between bg-base-200'>
        {!Auth.loggedIn() ? (
          <>
            <Routes>
              <Route 
                path='/'
                element={<Front/>}
              />

              <Route
                path='/signup'
                element={<Signup/>}
              />

              <Route
                path='/login'
                element={<Front/>} 
              />

              {/* add wildcard route
               <Route
                path='/*'
                element={}
              /> */}
            </Routes>
          </>
        ) : (
          <div className=''>
          <Nav/>
          
          <Routes>
            <Route
              path='/'
              element={<Home/>}
              />
            <Route
              path='/signup'
              element={<Signup/>}
              />
            <Route
              path='/login'
              element={<Login/>}
              />
            <Route
              path='/projects/:id'
              element={<SingleProject/>}
              />
            <Route
              path='/dev'
              element={<Dev/>}
              />
          </Routes>
        </div>
        )}
        </div>
      </Router>
    </ApolloProvider>
  );
}

