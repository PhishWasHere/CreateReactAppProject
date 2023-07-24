import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROJECT } from '../../../utils/queries';
import { REMOVE_TASK } from '../../../utils/mutations';
import Auth from '../../../utils/auth';


export default function InProgress() {
    const { id } = useParams();   
    
    const { loading, data } = useQuery(QUERY_PROJECT, {
        variables: { 
            projectId: id,
            userid: Auth.getProfile().data._id
        },
    });

    const project = data?.project || {};

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

    return(
        <div className="m-2">
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    project.tasks?.map((task: any) => (
                        task.status === "In Progress" ? (
                            <div key={task._id} className="p-2 min-h-36 flex flex-col bg-primary text-black rounded-lg">
                            <div className="flex flex-col">
                                <h4 className="text-lg font-bold">{task.name}</h4>
                                <p className="text-sm break-all">{task.description}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                            </div>
                            <div className='self-start mt-auto'>
                                <p>{task.dueDate}</p>
                                <p>Priority: {task.priority}</p>
                            </div>
                            <button onClick={() => {handleClick(task._id)}}>Delete Task</button>
                        </div>
                        ) : ('')
                    ))
                )}
            </div>
        </div>
    );
}