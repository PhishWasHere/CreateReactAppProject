import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT } from '../../../utils/queries';

import Auth from '../../../utils/auth';

import TaskCard from '../../common/TaskCard';


export default function Completed() {

    const { id } = useParams();   
    
    const { loading, data } = useQuery(QUERY_PROJECT, {
        variables: { 
            projectId: id,
            userid: Auth.getProfile().data._id
        },
    });

    const project = data?.project || {};

    return(
        <div className="m-2">
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    project.tasks?.map((task: any) => (
                        task.status === "Completed" ? (
                            <TaskCard/>
                        ) : ('')
                    ))
                )}
            </div>
        </div>
    );
}