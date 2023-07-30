import React, { useState } from 'react';

import Active from './Active';
import Completed from './Completed';
import Paused from './Paused';

export default function AllProjects() {

  const [activeTab, setActiveTab] = useState('Active')

  const nav = [ // array of components to render based on users current tab
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
      <section className='flex flex-col'>
        <div>
          <ul className='flex justify-center'>
            {nav.map((arr) => {
              const isActive = arr.name === activeTab;
              return (
                <li key={arr.name} className='px-1 mb-5'>
                  <button
                    className={`flex p-2 rounded-lg ${
                      isActive ? 'btn-neutral' : 'btn-primary'
                    } transition`}
                    onClick={() => setActiveTab(arr.name)}
                  >
                    {arr.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <section>
          <div className=''>
            {nav.map((arr) =>
              arr.name === activeTab ? (
                <div key={arr.name} className=''>
                  {arr.component}
                </div>
              ) : null
              )}
          </div>
        </section>
      </section>
    </>
  );
};
