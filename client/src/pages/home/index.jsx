import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { Navigate } from 'react-router-dom';


import AllProjects from '../../components/AllProjects';
import Stripe from '../../components/common/Stripe';
import AddProject from '../../components/common/forms/AddProject';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';


export default function Home() {
  const [showComponent, setShowComponent] = useState(false);
  
  const {loading, data } = useQuery(QUERY_USER, {
    variables: { userId: Auth.getProfile().data._id },
  }); 

  const user = data?.user || {};

  if(!Auth.loggedIn()) {
    return <Navigate to="/login"/>;
  }
  const handleClick = () => {
    setShowComponent((prevShowComponent) => !prevShowComponent);
  }
  return (
    <>
      <div className='lg:flex min-h-full'>
        <div className='px-3 py-1 lg:max-w-lg lg:w-1/6'>
          <div className='md:min-w-full'>

            <div className='flex'>
              <h2 className='text-xl font-semibold bg-base-100 p-2 px-3 rounded-lg'>Hi, {user.username}!</h2>
            </div>
            
            <div className='flex my-4 '>
              <div className='bg-base-100  rounded-lg'>
                <h3 className='p-2 text-lg text-center'>Add a project 
                  <button onClick={handleClick} className={'btn-primary p-2 transition rounded-lg lg:hidden'}>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" clip-rule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Open modal</span>
                  </button>
                </h3>
                <div className={showComponent ? 'mx-auto' : 'hidden lg:block'}> 
                  <AddProject />
                </div>
              </div>
            </div>
          </div>

            <div className='flex mt-auto'>
                <Stripe />
            </div>
        </div>

        <div className='flex mx-auto justify-center'>
          <AllProjects />
        </div>
      </div>
    </>
  );
}
