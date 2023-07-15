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

    const classNames = ['btn-ghost', 'btn-primary', 'btn-info', 'btn-success', 'btn-warning',];
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = () => {

        setCurrentIndex((prevIndex) => (prevIndex + 1) % classNames.length);
      };

    return (
        <nav className='navbar justify-center '>
            <div className="flex-1">
            <button className={`btn normal-case text-xl ${classNames[currentIndex]}`} onClick={handleClick}>C.R.A.P</button>
            </div>
            
            <div className="dropdown dropdown-end">
                <button className="btn btn-square btn-ghost">
                    <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>

                <form tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-2">
                    <button className=' mb-1 border rounded-xl ' >Settings</button>
                    <button className=' mb-1 border rounded-xl ' onClick={handleSubmit}>Logout</button> 
                </form>
            </div>
        </nav>
    )
}