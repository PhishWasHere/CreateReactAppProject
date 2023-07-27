import React, { useState } from 'react';

import Active from './Active';
import Completed from './Completed';
import Paused from './Paused';

import AddProject from '../common/AddProject';

export default function AllProjects() {

  const [activeTab, setActiveTab] = useState('Active')
  const [showComponent, setShowComponent] = useState(false);
  const handleClick = () => {
    setShowComponent((prevShowComponent) => !prevShowComponent);
  }


  const nav = [
    {
      name: 'Active',
      component: <Active />,
    },
    {
      name: 'Paused',
      component: <Paused />,
    },
    {
      name: 'Completed',
      component: <Completed />,
    },
  ];

  return (
    <>
      <div>
        <button onClick={handleClick} className={'btn-primary p-2 transition rounded-lg'}>➕</button>
        <div className={showComponent ? '' : 'hidden'}>
          <AddProject />
        </div>
      </div>

      <section className='flex flex-col'>
        <div>
          <ul className='flex justify-center'>
            {nav.map((item) => {
              const isActive = item.name === activeTab;
              return (
                <li key={item.name} className='mx-1'>
                  <button
                    className={`${
                      isActive ? 'text-red-500' : 'text-blue-500'
                    } hover:text-purple-500`}
                    onClick={() => setActiveTab(item.name)}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <div className=''>
            {nav.map((item) =>
              item.name === activeTab ? (
                <div key={item.name} className=''>
                  {item.component}
                </div>
              ) : null
              )}
          </div>
        </div>
      </section>
    </>
  );
};
