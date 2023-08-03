import React, {useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT } from '../../utils/queries';
import Auth from '../../utils/auth';

import ProjectDelete from '../../components/common/cards/ProjecDeleteCard';

import TaskCard from '../../components/common/cards/TaskCard';
import AddTask from '../../components/common/forms/AddTask';
import UpdateProject from '../../components/common/forms/UpdateProject';

export default function SingleProject () {
    const [projectData, setProjectData] = useState(false); // used to toggle form
    const [taskData, setTaskData] = useState(false); // used to toggle form
    const [projectDelete, setProjectDelete]  = useState(false); // used to toggle form

    const { id } = useParams();   

    const { loading, data } = useQuery(QUERY_PROJECT, {
        variables: { 
            projectId: id,
            userid: Auth.getProfile().data._id
        },
    });

    const project = data?.project || {};
    
    const handleDelete = async () => { // used to toggle form
        setProjectData(false)
        setTaskData(false)
        setProjectDelete((prevProjectDelete) => !prevProjectDelete);
    };

    const handleUpdate = async () => { // used to toggle form
        setTaskData(false)
        setProjectDelete(false)
        setProjectData((prevProjectData) => !prevProjectData);
    }

    const handleTaskUpdate = async () => { // used to toggle form
        setProjectData(false)
        setProjectDelete(false)
        setTaskData((prevTaskData) => !prevTaskData);
    }
    return(
        <div className="xl:flex h-full "> 
            <aside>
                <div className='flex xl:flex-col py-5 px-3 bg-base-100 rounded-lg'>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-xl'>{project.name}</h1>
                        <p className='font-semibold text-base'>{project.description}</p>
                

                        <div className='flex '>
                            <button className='btn-primary p-1 rounded-lg mx-0.5' onClick={() => {handleUpdate()}}>Update Project</button>
                            <button className='btn-primary p-1 rounded-lg mx-0.5' onClick={() => {handleTaskUpdate()}}>addTask</button>
                            <button className='btn-error p-1 rounded-lg mx-0.5 text-gray-950/100' onClick={() => {handleDelete()}}>Delete Project</button>
                        </div>
                        {projectDelete ? (
                            <ProjectDelete/>
                        ) : null }
                    </div>

                    {projectData ? (
                        <UpdateProject 
                        projectId={project._id} 
                        name={project.name} 
                        description={project.description} 
                        status={project.status}
                        />
                        ) : null
                    }

                    {taskData ? ( 
                        <AddTask />
                        ) : null 
                    }
                </div> 
            </aside>
            
            <main className='grid lg:flex lg:flex-row mx-auto sm:justify-center'>
                <div className='w-72 xl:w-96 md:w-96 border-x border-b border-primary rounded-2xl '>
                    <p className='border border-primary rounded-2xl text-center'>Not Started</p>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        project.tasks?.map((task) => (
                            task.status === "Not Started" ? (
                                <TaskCard key={task._id} task={task}/>
                            ) : ('')
                        ))
                    )}
                </div>

                <div className='w-72 xl:w-96 md:w-96 border-x border-b border-primary rounded-2xl '>
                    <p className='border border-primary rounded-2xl text-center'>In Progress</p>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        project.tasks?.map((task) => (
                            task.status === "In Progress" ? (
                                <TaskCard key={task._id} task={task}/>
                            ) : ('')
                        ))
                    )}
                </div>
                
                <div className='w-72 xl:w-96 md:w-96 border-x border-b border-primary rounded-2xl '>
                    <p className='border border-primary rounded-2xl text-center'>Completed</p>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        project.tasks?.map((task) => (
                            task.status === "Completed" ? (
                                <TaskCard key={task._id} task={task}/>
                            ) : ('')
                        ))
                    )}
                </div>                
            </main>
        </div>
    );
} 