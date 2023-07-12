import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {

  const handleClick= (e: any) => {
    e.preventDefault();
    fetch('/api', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res);
    });
    console.log('clicked');
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex'>

            <button className='btn' onClick={handleClick}>click</button>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
