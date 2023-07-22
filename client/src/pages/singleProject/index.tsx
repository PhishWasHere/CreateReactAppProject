import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROJECT } from '../../utils/queries';
import { REMOVE_PROJECT, REMOVE_TASK } from '../../utils/mutations';
import Auth from '../../utils/auth';

import AddTask from '../../components/addtask';

export default function SingleProject () {
    const { id } = useParams();   
    console.log(id);
    
    const { loading, data } = useQuery(QUERY_PROJECT, {
        variables: { 
            projectId: id,
            userid: Auth.getProfile().data._id
        },
    });
    
    const [removeProject, {error}] = useMutation(REMOVE_PROJECT);

    const project = data?.project || {};

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
    }     

    return(
        <div>
            <div>
                <button onClick={() => {handleClick()}}>Delete Project</button>
                <h1>{project.name}</h1>
                <p>{project.description}</p>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    project.tasks?.map((task: any) => (
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
                        </div>
                    ))
                )    
                }
            </div>
            <AddTask />
        </div>
    );
}