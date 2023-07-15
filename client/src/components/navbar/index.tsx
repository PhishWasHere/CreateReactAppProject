import React, {useEffect, useState} from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

export default function Navbar () {

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('logout');
        try {
            Auth.logout();
        } catch (err) {
            console.log('err: ', err);
        }
    };

    return (
        <div>
            <form className='text-black' onSubmit={handleSubmit}>
                <button type="submit" className='text-white'>Logout</button>
            </form>
        </div>
    )
}