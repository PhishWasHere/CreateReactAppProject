import React, {useEffect, useState} from 'react';
import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function Logout () {
    const [logout, {error, data}] = useMutation(LOGOUT_USER);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('logout');
        try {
            await logout();
            Auth.logout();
        } catch (err) {
            console.log('err: ', err);
        }
    };

    return (
        <div>
            <h1>Logout</h1>
            <form className='text-black' onSubmit={handleSubmit}>
                <button type="submit" className='text-white'>Submit</button>
            </form>
            {error ? <p>{error.message}</p> : null}
        </div>
    )
}