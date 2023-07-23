import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROJECT } from '../../../utils/queries';
import { REMOVE_TASK } from '../../../utils/mutations';
import Auth from '../../../utils/auth';


export default function NotStarted() {
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
            <div className="">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    project.tasks?.map((task: any) => (
                        task.status === "Not Started" ? (
                        <div key={task._id} className="card mb-3 bg-primary text-black">
                            <h4 className="card-header bg-dark text-light p-2 m-0">
                                {task.name}
                            </h4>
                            <div className=''>
                                <div className="card-body bg-light p-2">
                                    <p>{task.description}</p>
                                </div>
                                <div className="card-body bg-light p-2">
                                    <p>{task.dueDate}</p>
                                </div>
                                <div className="card-body bg-light p-2">
                                    <p>{task.priority}</p>
                                </div>
                                <div className="card-body bg-light p-2">
                                    <p>{task.status}</p>
                                </div>
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