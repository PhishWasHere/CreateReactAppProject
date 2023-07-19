import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../utils/mutations';
import React, { useState, useEffect } from 'react';

import Auth from '../../utils/auth';

export default function Form() {
 
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
  
    const [addProject, { error }] = useMutation(ADD_PROJECT);
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      console.log(Auth.getProfile().data._id);
      console.log('projectName', name);
      console.log('projectDescription', description);
      try {
        const { data } = await addProject({
          variables: {
            name,
            description,
            createdBy: Auth.getProfile().data._id,
          },
        });
        console.log('data', data);
      } catch (err) {
        console.error(err);
        console.log(err);
      }
    };
    return(
    <div>
        <button>
          <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Create Project</button>
          </form>
        </button>
      </div>
    )
}