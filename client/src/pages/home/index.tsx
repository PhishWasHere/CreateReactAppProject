import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../../utils/queries';
import AddProject from '../../components/addproject';

import Auth from '../../utils/auth';
import { Link, Navigate, useParams } from 'react-router-dom';

export default function Home() {
  const [showComponent, setShowComponent] = useState(false);

  const { loading, data } = useQuery(QUERY_PROJECTS, {
    variables: { userid: Auth.getProfile().data._id  },
  });  
  const user = data?.user || [];
  const projects = data?.projects || [];

  useEffect(() => { //todo reload on delete task

  }, []);
  
  if(!Auth.loggedIn()) {
    return <Navigate to="/login"/>;
  }

  const handleClick = () => {
    console.log('clicked');
    setShowComponent((prevShowComponent) => !prevShowComponent);
  }

  return (
    <>
    <div className='bg-white h-full min-h-full'> 
      <button onClick={handleClick} className={projects.length === 0 ? 'hidden' : 'flex flex-wrap p-2 rounded-md transition-all mx-6 btn-primary' }>➕</button>
      <main className='flex justify-center mx-auto w-10/12'>
        <div className="flex-row">
          {showComponent ? (
            <div className='flex justify-center mb-5'>
              <AddProject />
            </div>
            ) : null 
          }  

            {loading ? (
              <div>Loading...</div>
              ) : projects.length === 0 ? (
                <section className='flex justify-center'>
                  <div className=''>
                    <h2 className='bg-primary text-black text-lg p-2 rounded-md text-center mb-5'>No Projects Yet</h2>
                    <AddProject />
                  </div>
                </section>
            ) : (
              <div className="md:grid grid-cols-2 gap-4 justify-center items-center mx-2">
                {projects.map((project: any) => (
                  <div key={project._id} className="card w-96 bg-base-100 shadow-xl">
                    <div className='card-body'>
                      <h4 className="card-title">
                        {project.name}
                      </h4>
                      <div className="">
                        <p>{project.description || "No description"}</p>
                      </div>
                      <div className='card-actions'>
                        <p className='justify-start mt-auto'>Tasks left: {project.tasks?.length || 0}</p>
                        <Link className='justify-end' to={`/projects/${project._id}`}>
                          <button className="btn btn-primary">
                            View Project
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </main>
    </div>
  </>
  );
}
