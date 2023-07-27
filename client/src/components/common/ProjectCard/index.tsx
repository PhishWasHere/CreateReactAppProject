import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../../../utils/queries';
import Auth from '../../../utils/auth';
import UpdateProject from '../UpdateProject';


export default function ProjectCard() {

    const { loading, data } = useQuery(QUERY_PROJECTS, {
        variables: { userid: Auth.getProfile().data._id  },
    });  

    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const user = data?.user || [];
    const projects = data?.projects || [];

    const handleProjectUpdate = async (projectId: any) => {    
        setSelectedProjectId((prevSelectedProjectId) =>
        prevSelectedProjectId === projectId ? null : projectId
        );
    }
    return(
        <>
        {loading ? (
              <div>Loading...</div>
              ) : (
              <>
                <div className="md:grid gap-4 justify-center items-center mx-2">
                  {projects.map((project: any) => (
                      <div key={project._id} className="card min-w-80 bg-base-100 shadow-xl">
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
                              <UpdateProject 
                                projectId={project._id} 
                                name={project.name} 
                                description={project.description} 
                                status={project.status}
                                />
                            </div>
                          )}
                        </div>
                      </div>
                  ))}
                </div>
                
              </>
            )}
        </>
    )
}