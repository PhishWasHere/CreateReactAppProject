import React, { useState } from 'react';
import NotStarted from './NotStarted';
import InProgress from './InProgress';
import Completed from './Completed';

export default function AllProjects() {

  const [activeTab, setActiveTab] = useState('Not Started');

  const nav = [
    {
      name: 'Not Started',
      component: <NotStarted />,
    },
    {
      name: 'In Progress',
      component: <InProgress />,
    },
    {
      name: 'Completed',
      component: <Completed />,
    }
  ];

  return (
    <>
      <section className='flex justify-center'>
        <ul className='flex'>
          {nav.map((item) => {
            const isActive = item.name === activeTab;

            return (
              <li key={item.name} className='mr-5'>
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
      </section>
      <div className='flex justify-center mt-4'>
        {nav.map((item) =>
          item.name === activeTab ? (
            <div key={item.name} className='flex justify-center'>
              {item.component}
            </div>
          ) : null
        )}
      </div>
    </>
  );
};
