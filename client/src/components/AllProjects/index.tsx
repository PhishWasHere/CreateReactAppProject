import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../../utils/queries';
import AddProject from '../../components/AddProject';

import Auth from '../../utils/auth';
import { Link, Navigate, useParams } from 'react-router-dom';

import UpdateProject from '../../components/UpdateProject';

export default function AllProjects() {
  const [showComponent, setShowComponent] = useState(false);

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  
  const handleClick = () => {
    setShowComponent((prevShowComponent) => !prevShowComponent);
  }

  
  const { loading, data } = useQuery(QUERY_PROJECTS, {
    variables: { userid: Auth.getProfile().data._id  },
  });  

  const user = data?.user || [];
  const projects = data?.projects || [];

  const handleProjectUpdate = async (projectId: any) => {    
    setSelectedProjectId((prevSelectedProjectId) =>
    prevSelectedProjectId === projectId ? null : projectId
    );
  }

  return (
    <>
    <div className='h-full min-h-full'> 
      <button onClick={handleClick} className={projects.length === 0 ? 'hidden' : 'flex flex-wrap p-2 rounded-md transition-all mx-6 btn-primary' }>➕</button>
      <section className='flex justify-center mx-auto w-10/12'>
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
                  <div key={project._id} className="card min-w-80 bg-base-100 shadow-xl">
                    <div className='flex flex-col mt-2 mx-5'>

                      <button onClick={() => handleProjectUpdate(project._id)} className='text-end'>settings</button>
                      {selectedProjectId === project._id && (
                        <div>
                          <UpdateProject projectId={project._id}/>
                        </div>
                      )}

                      <div className="break-all ">
                        <h4 className="card-title">{project.name}</h4>
                        <p className='w-4/6'>{project.description || "No description"}</p>
                      
                        <div className='self-end mt-auto justify-end'>
                          <p className='justify-start mt-auto'>Tasks left: {project.tasks?.length || 0}</p>
                          <Link className='justify-end ' to={`/projects/${project._id}`}>
                            <button className="btn btn-primary ">
                              View Project
                            </button>
                          </Link>
                        </div>

                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </section>
    </div>
  </>
  );
}
