import React, {useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROJECT } from '../../utils/queries';
import { REMOVE_PROJECT } from '../../utils/mutations';
import Auth from '../../utils/auth';

import TaskCard from '../../components/common/TaskCard';
import AddTask from '../../components/common/AddTask';
import UpdateProject from '../../components/common/UpdateProject';

export default function SingleProject () {
    const [projectData, setProjectData] = useState(false);
    const [taskData, setTaskData] = useState(false);

    const { id } = useParams();   

    const { loading, data } = useQuery(QUERY_PROJECT, {
        variables: { 
            projectId: id,
            userid: Auth.getProfile().data._id
        },
    });
    
    const [removeProject, {error}] = useMutation(REMOVE_PROJECT);

    const project = data?.project || {};

    const status = project.tasks?.map((task: any) => task.status) || [];
    

    const navigate = useNavigate();
    const handleClick = async () => { //move to component (did i mean delete proj btn???)
        try {
             await removeProject({
                variables: {
                    projectId: id,
                    userid: Auth.getProfile().data._id
                },
            });
            navigate ("/"); //figure out how to reload data
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async () => {
        setProjectData((prevProjectData) => !prevProjectData);
    }

    const handleTaskUpdate = async () => {
        setTaskData((prevTaskData) => !prevTaskData);
    }
    
    return(
        <div className="lg:flex min-h-screen mb-5"> 
            <div className='px-3 lg:max-w-lg bg-stone-500 container'>
                <div className='flex flex-col'>
                    <button onClick={() => {handleUpdate()}}>Update Project</button>
                    <button onClick={() => {handleClick()}}>Delete Project</button>

                    <button onClick={() => {handleTaskUpdate()}}>addTask</button>
                </div>

                <div className='md:min-w-full'>
                    <h1>{project.name}</h1>
                    <p>{project.description}</p>
                </div>
            </div> 

            {projectData ? (
                <UpdateProject/>
                ) : null 
            }

            {taskData ? (
                <AddTask />
                ) : null 
            }
            
            <div className='grid sm:flex'>
                <div className='w-96 border rounded-2xl '>
                    Not Started
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        project.tasks?.map((task: any) => (
                            task.status === "Not Started" ? (
                                <TaskCard key={task._id} task={task}/>
                            ) : ('')
                        ))
                    )}
                </div>

                <div className='w-96 border rounded-2xl'>
                    In Progress
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        project.tasks?.map((task: any) => (
                            task.status === "In Progress" ? (
                                <TaskCard key={task._id} task={task}/>
                            ) : ('')
                        ))
                    )}
                </div>
                
                <div className='w-96 border rounded-2xl'>
                    Completed
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        project.tasks?.map((task: any) => (
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