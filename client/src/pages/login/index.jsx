import React, { useState} from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import{ Link } from 'react-router-dom';
import Auth from '../../utils/auth';


export default function Login () {
    const [formState, setFormState] = useState({ email: '', password: '',});

    const [login, {error, data}] = useMutation(LOGIN_USER);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {            
            const {data} = await login({
                variables: {...formState}
            });
            
            Auth.login(data.login.token);
            
        } catch (err) {
            console.log('err: ', err);
        }
    };

    return (
<div>
  {!Auth.loggedIn() ? (
    <>
      {data ? <p>{data.login.message}</p> : null}
        <form onSubmit={handleSubmit} className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
            <div className="card-body ">
                <div className="form-control ">
                    <label className="label">
                        <span className="">Email</span>
                    </label>

                    <input type="email" name='email' value={formState.email} placeholder="email" onChange={handleChange} className="input input-bordered" />

                    </div>
                    <div className="form-control">

                    <label className="label">
                        <span className="">Password</span>
                    </label>

                    <input type="password" name='password' value={formState.password} placeholder="password" onChange={handleChange} className="input input-bordered" />

                    <label className="label ml-auto mt-1">
                       <Link to="/signup" > Sign Up!</Link>
                    </label>
                    
                </div>
                {error ? <p>{error.message}</p> : null}
                <div className="form-control mt-3">
                    <button className="btn btn-primary" type='submit'>Login</button>  
                </div>
            </div>
        </form>
      
    </>
    ) : (
    <p>You are logged in</p>
    )}
    </div>
    )
}