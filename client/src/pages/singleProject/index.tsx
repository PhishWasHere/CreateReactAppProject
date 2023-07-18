import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';



export default function SingleProject () {
    const { id } = useParams();
//    console.log('id', id);
   
//     const { loading, data } = useQuery(QUERY_PROJECT_DETAILS, {
//         variables: { projectid: id },
//     });
//     console.log('data', data);
    

    // const project = data?.project || {};

    return(
        <div>
            a
            <div>

            </div>
        </div>
    );
}