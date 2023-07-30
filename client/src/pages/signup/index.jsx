import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function Signup () {
    
    const [formState, setFormState] = useState({username: '', email: '', password: '', confirmPassword: ''});
    
    const reg = /.+@.+\..+/;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const [addUser, {error, data}] = useMutation(ADD_USER);

    const handleSubmit = async (e) => {
        e.preventDefault();


        console.log(formState);

        if (!reg.test(formState.email)) {
            console.log('err');
            return;
        }
        

        if (formState.password !== formState.confirmPassword) {
            console.log('err');
            return;
        }

        try {
            const {data} = await addUser({
                variables: {...formState}
            });

            console.log(data, 'data');
            Auth.login(data.addUser.token);

        } catch (err) {
            console.log('err: ', err);
        }
    }

    return (
        <div>
            {!Auth.loggedIn() ? (
                <>
                    {data ? <p>{data.addUser.message}</p> : null}
                    <div className="my-auto flex justify-center">
                        <form onSubmit={handleSubmit} className="card mt-10 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                            <div className="card-body ">
                                <div className="form-control ">
                                    <label className="label">
                                    <span className=''>Username</span>                           
                                    </label>

                                    <input type="text" 
                                    name='username' 
                                    value={formState.username} 
                                    placeholder="Username" 
                                    onChange={handleChange} 
                                    className="input input-bordered" 
                                    />
                                </div>

                                <div className="form-control ">
                                    <label className="label">
                                    <span className={formState.email && !reg.test(formState.email) ? 'text-red-700' : ''}>Email</span>                                         
                                    </label>

                                    <input type="email" 
                                    name='email' 
                                    value={formState.email} 
                                    placeholder="email" 
                                    onChange={handleChange} 
                                    className="input input-bordered" 
                                    />
                                </div>

                                <div className="form-control ">
                                    <label className="label">
                                        <span className={`${formState.password !== formState.confirmPassword ? 'text-red-700' : ''}`} >Password</span>                                
                                    </label>

                                    <input type="Password" 
                                    name='password' 
                                    value={formState.password} 
                                    placeholder="Password" 
                                    onChange={handleChange} 
                                    className={`input input-bordered`} 
                                    />
                                </div>

                                <div className="form-control ">
                                    <label className="label">
                                        <span className={`${formState.password !== formState.confirmPassword ? 'text-red-700' : ''}`} >Confirm Password</span>                                
                                    </label>

                                    <input type="Password" 
                                    name='confirmPassword' 
                                    value={formState.confirmPassword} 
                                    placeholder="Confirm Password" 
                                    onChange={handleChange} 
                                    className={`input input-bordered`}
                                />

                                    
                                    
                                    {formState.password !== formState.confirmPassword && (
                                        <p className="mt-4 text-red-700">Passwords do not match</p>
                                    )}
                                    {formState.email && !reg.test(formState.email) ? (
                                        <p className="mt-4 text-red-700">Please enter a valid email</p>
                                    ) : null}
                                </div>

                                <div className="form-control mt-3">
                                    <button
                                        className={`${formState.password !== formState.confirmPassword ? 'btn btn-warning' : 'btn btn-primary'}`}
                                        type='submit'
                                        disabled={formState.password !== formState.confirmPassword || !reg.test(formState.email) || !formState.username || !formState.password}
                                    >
                                        Sign Up
                                    </button>  
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <p>You are already logged in!</p> 
            )} 

            
        <div className='flex space-x-2 justify-center mt-5'>
            <p className='my-auto'>Already have an account?</p> 
            <Link to='/login'><button className='px-2 py-1 rounded-xl transition btn-primary'>Login</button></Link>    
        </div>

        </div>
    )
}
