import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


export default function Login () {
    const [formState, setFormState] = useState({ email: '', password: '',});

    const [login, {error, data}] = useMutation(LOGIN_USER);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('form', formState);

        try {
            console.log('tryform', formState);
            
            const {data} = await login({
                variables: {...formState}
            });
            
            console.log('data: ', data);
            Auth.login(data.login.token);
            
        } catch (err) {
            console.log('err: ', err);
        }
    };

    return (
<div>
  <Link to="/signup">New User? Signup Now</Link>
  {!Auth.loggedIn() ? (
    <>
      {data ? <p>{data.login.message}</p> : null}
      <h1>Login</h1>
      <form className="text-black" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
        />
        <button type="submit" className="text-white">
          Submit
        </button>
      </form>
      {error ? <p>{error.message}</p> : null}
    </>
    ) : (
    <p>You are logged in</p>
    )}
    </div>
    )
}