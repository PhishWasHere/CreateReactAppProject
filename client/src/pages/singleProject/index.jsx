import React, {useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROJECT } from '../../utils/queries';
import Auth from '../../utils/auth';

import ProjectDelete from '../../components/common/cards/ProjecDteleteCard';

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

    const status = project.tasks?.map((task) => task.status) || [];
    
    const handleDelete = async () => { //make new comp to confirm deletion
        setProjectData(false)
        setTaskData(false)
        setProjectDelete((prevProjectDelete) => !prevProjectDelete);
    };

    const handleUpdate = async () => {
        setTaskData(false)
        setProjectDelete(false)
        setProjectData((prevProjectData) => !prevProjectData);
    }

    const handleTaskUpdate = async () => {
        setProjectData(false)
        setProjectDelete(false)
        setTaskData((prevTaskData) => !prevTaskData);
    }
    return(
        <div className="xl:flex h-full "> 
            <div className='flex xl:flex-col px-3 bg-base-100 rounded-lg'>
                <div className='flex  flex-col'>
                    <h1 className='font-semibold text-xl'>{project.name}</h1>
                    <p className='font-semibold text-base'>{project.description}</p>
                    <p className='text-base'>Tasks left: </p>

                

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
            
            <div className='grid lg:flex lg:flex-row mx-auto sm:justify-center'>
                <div className='w-72 xl:w-96 md:w-96 border rounded-2xl '>
                    Not Started
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

                <div className='w-72 xl:w-96 md:w-96 border rounded-2xl '>
                    In Progress
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
                
                <div className='w-72 xl:w-96 md:w-96 border rounded-2xl '>
                    Completed
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
            </div>
        </div>
    );
} 