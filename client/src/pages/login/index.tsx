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
        <form onSubmit={handleSubmit} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="text" placeholder="password" className="input input-bordered" />
                    <label className="label">
                        <a href="/signup" className="label-text-alt link link-hover">New User, Sign Up?</a>
                    </label>
                    </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary" type='submit'>Login</button>  
                </div>
            </div>
        </form>
      {error ? <p>{error.message}</p> : null}
    </>
    ) : (
    <p>You are logged in</p>
    )}
    </div>
    )
}