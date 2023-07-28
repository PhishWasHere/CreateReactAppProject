import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { Navigate } from 'react-router-dom';

import AllProjects from '../../components/AllProjects';
import Stripe from '../../components/common/Stripe';
import AddProject from '../../components/common/forms/AddProject';


export default function Home() {

  const [showComponent, setShowComponent] = useState(false);

  if(!Auth.loggedIn()) {
    return <Navigate to="/login"/>;
  }

  const handleClick = () => {
    setShowComponent((prevShowComponent) => !prevShowComponent);
  }

  return (
    <>
      <div className='lg:flex min-h-screen mb-5'>
        <div className='px-3 py-1 lg:max-w-lg bg-stone-500 lg:w-1/6'>
          <div className='md:min-w-full'>
            <div className='flex my-4 flex-col justify-start'>
              <div>
                <button onClick={handleClick} className={'btn-primary p-2 transition rounded-lg'}>➕</button>
                <div className={showComponent ? '' : 'hidden'}>
                  <AddProject />
                </div>
              </div>

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
