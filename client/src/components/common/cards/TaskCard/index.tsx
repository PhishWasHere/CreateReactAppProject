import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_TASK } from '../../../../utils/mutations';
import Auth from '../../../../utils/auth';

import UpdateTask from '../../forms/UpdateTask'; 


export default function TaskCard({ task }:any) {
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => { //fixes mem leaks (idk how, but the err told me to do this)
        return () => {};
    }, []);

    const { id } = useParams();
    
    const [removeTask, {error}] = useMutation(REMOVE_TASK);
    
    const handleClick = async (taskId: string) => { 
       try {
            await removeTask({
                variables: {
                    projectId: id,
                    taskId: taskId,
                    userid: Auth.getProfile().data._id
                },
            });
       } catch (err) {
            console.log(err);
       }
    }

    const handleTaskUpdate = async (taskId: any) => {
        setSelectedTaskId((prevSelectedTaskId) =>
        prevSelectedTaskId === taskId ? null : taskId
      );
    }

    return(
        <div className="m-2">
            <div>
                <div className="p-2 min-h-36 flex flex-col bg-primary text-black rounded-lg">
                    <div className="flex flex-col">
                        <h4 className="text-lg font-bold">{task.name}</h4>
                        <p className="text-sm break">{task.description}</p>
                    </div>
                    <div className='self-start mt-auto'>
                        <p>{task.dueDate}</p>
                        <p>Priority: {task.priority}</p>
                    </div>
                    <button onClick={() => {handleClick(task._id)}}>Delete Task</button>
                    <button onClick={() => handleTaskUpdate(task._id)}>me</button>
                    {task._id === selectedTaskId && (
                        <UpdateTask 
                            taskId={task._id} 
                            name={task.name}
                            description={task.description}
                            dueDate={task.dueDate}
                            priority={task.priority}
                            status={task.status}
                        />
                    )} 
                </div>
            </div>
        </div>
    );
}