import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function Signup () {

    const [formState, setFormState] = useState({username: '', email: '', password: '',});

    const [addUser, {error, data}] = useMutation(ADD_USER);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formState);

        try {
            console.log('try');
            
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
            <Link to='/login'>Already a User? Login Now</Link>
            {data ? <p>{data.addUser.message}</p> : null}
            <h1>Signup</h1>
            <form className='text-black' onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" onChange={(e) => setFormState({...formState, username: e.target.value})} />
                <input type="text" placeholder="Email" onChange={(e) => setFormState({...formState, email: e.target.value})} />
                <input type="password" placeholder="Password" onChange={(e) => setFormState({...formState, password: e.target.value})} />
                <button type="submit" className='text-white'>Submit</button>
            </form>
            {error ? <p>{error.message}</p> : null}
        </div>
        
    )
}