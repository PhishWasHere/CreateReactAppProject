import React, { } from 'react';
import Auth from '../../utils/auth';
import { Navigate } from 'react-router-dom';

import AllProjects from '../../components/AllProjects';
import Stripe from '../../components/common/Stripe';

export default function Home() {

  
  if(!Auth.loggedIn()) {
    return <Navigate to="/login"/>;
  }

  return (
    <>
      <div className='lg:flex min-h-screen mb-5'>
        <div className='px-3 py-1 lg:max-w-lg bg-stone-500 lg:w-1/12'>
          <div className='md:min-w-full'>
            <div  className='flex my-4 flex-col justify-start'>
              words 
              <Stripe />
            </div>
          </div>
        </div>

        <div className='flex mx-auto'>
          <AllProjects />
        </div>
      </div>
    </>
  );
}
