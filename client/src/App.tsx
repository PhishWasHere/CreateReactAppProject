import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex'>
        <h2>a</h2>
        <h1 className='flex w-full border border-black text-9xl'>hi</h1>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
