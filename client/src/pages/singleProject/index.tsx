import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROJECT } from '../../utils/queries';
import { REMOVE_PROJECT } from '../../utils/mutations';
import Auth from '../../utils/auth';

import Completed from '../../components/taskstatus/Completed';
import InProgress from '../../components/taskstatus/InProgress';
import NotStarted from '../../components/taskstatus/NotStarted';

import AddTask from '../../components/AddTask';

export default function SingleProject () {
    const { id } = useParams();   
    
    const { loading, data } = useQuery(QUERY_PROJECT, {
        variables: { 
            projectId: id,
            userid: Auth.getProfile().data._id
        },
    });
    console.log(data, id, loading);
    
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
                
                <Completed />
                <InProgress />
                <NotStarted />
                
            </div>
            <AddTask />
        </div>
    );
}