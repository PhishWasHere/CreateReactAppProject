import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../../../utils/queries';


import Auth from '../../../utils/auth';
import { Link, Navigate, useParams } from 'react-router-dom';

import UpdateProject from '../../../components/UpdateProject';

export default function Active() {
  const [showComponent, setShowComponent] = useState(false);

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  

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
    <div className='h-full min-h-full mx-auto'> 
      <section className='flex justify-center mx-auto w-full'>
        <div className="flex-row"> 
            {loading ? (
              <div>Loading...</div>
              ) : (
              <>
                <div className="md:grid grid-cols-3 gap-4 justify-center items-center mx-2">
                  {projects.map((project: any) => (
                    project.status === "Active" ? (
                      <div key={project._id} className={"card min-w-80 bg-base-100 shadow-xl" + (selectedProjectId === project._id && showComponent ? ' hidden' : '')}>
                        <div className='flex flex-col mt-2 mx-5 lg:w-96 md:w-80 sm:w-72 w-72'>
                          
                          <div className="break">
                            <h4 className="card-title">{project.name}</h4>
                            <p className='w-4/6'>{project.description || "No description"}</p>
                          
                            <div className='self-end mt-auto'>
                              <p className='justify-start mt-auto'>Tasks left: {project.tasks?.length || 0}</p>
                              <div className='flex'>
                                <Link className='' to={`/projects/${project._id}`}>
                                  <button className="btn-primary rounded-lg p-2 transition mb-2">
                                    View Project
                                  </button>
                                </Link>
                                <button onClick={() => handleProjectUpdate(project._id)} className='text-end ml-auto'>settings</button>
                              </div>
                            </div>

                          </div>
                          
                          {selectedProjectId === project._id && (
                            <div>
                              <UpdateProject projectId={project._id}/>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : null
                  ))}
                </div>
                
              </>
            )}
        </div>
      </section>
    </div>
  </>
  );
}
