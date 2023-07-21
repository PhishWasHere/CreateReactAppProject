import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_PROJECT } from '../../utils/queries';
import Auth from '../../utils/auth';

import AddTask from '../../components/addtask';

export default function SingleProject () {
    const { id } = useParams();
   console.log('id', id);
   
    const { loading, data } = useQuery(QUERY_PROJECT, {
        variables: { projectId: id },
    });
    console.log('data', data);
    

    const project = data?.project || {};

    return(
        <div>
            <div>
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
                    ))
                )    
                }
            </div>
            <AddTask />
        </div>
    );
}