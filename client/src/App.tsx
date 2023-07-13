import React from 'react';
import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import {ADD_USER} from './utils/mutations'



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {

  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  })

  
  const [addUser, { error, data }] = useMutation(ADD_USER);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const {data} = await addUser({
        variables: {...state}
      });

    } catch (err) {
      console.error(err);
    }
  }


  // const handleClick= (e: any) => {
  //   e.preventDefault();
  //   fetch('/api', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then((res) => {
  //     console.log(res);
  //   });
  //   console.log('clicked');
  // }

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex'>
          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='username' name='username' value={state.username}/>
            <input type='text' placeholder='email' name='email' value={state.email}></input>
            <input type='password' placeholder='password' name='password' value={state.password}></input>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
