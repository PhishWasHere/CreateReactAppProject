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
        variables: { _id: id },
    });
    console.log('data', data);
    

    const project = data?.project || {};

    return(
        <div>
            <div>
                <h1>{project.name}</h1>
                <p>{project.description}</p>
                <p>{project.tasks}</p>
            </div>
            <AddTask />
        </div>
    );
}