import React, {  } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../../../utils/queries';

import Auth from '../../../utils/auth';

import ProjectCard from '../../common/cards/ProjectCard';


export default function Active() {

  const { loading, data } = useQuery(QUERY_PROJECTS, {
    variables: { userid: Auth.getProfile().data._id  },
  });  
  
  const projects = data?.projects || [];

  return (
    <>
    <div className='h-full min-h-full mx-auto'> 
      <section className='flex justify-center mx-auto w-full'>
        <div className="flex-row"> 
            {loading ? (
              <div>Loading...</div>
              ) : (
              <>
                <div className="md:grid lg:flex xl:grid grid-cols-2 gap-3 justify-center items-center mx-2">
                  {projects.map((project) => (
                    project.status === "Active" ? (
                      <ProjectCard key={project._id} project={project}/>
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
