import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../../../utils/mutations';
import React, { useState } from 'react';

import Auth from '../../../../utils/auth';

export default function AddProject() {
 
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
  
    const [addProject, { error }] = useMutation(ADD_PROJECT);
  
    const handleSubmit = async (e) => {

      try {
        const { data } = await addProject({
          variables: {
            name,
            description,
            status: 'Active',
            userId: Auth.getProfile().data._id,
          },
        });
        
      } catch (err) {
        console.error(err);
      }
    };
    return(
      <form onSubmit={handleSubmit} className="card mt-0 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body ">
            <div className="form-control ">
              <label className="label">
                <span>Project Name</span>
              </label>
              <input type='text'
              name='Project Name'
              value={name}
              placeholder='Project Name'
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered" 
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span>Project Description</span>
              </label>
              <input type='text'
              name='Project Description'
              value={description}
              placeholder='Project Description'
              onChange={(e) => setDescription(e.target.value)}
              className="input input-bordered" 
              />
            </div>

            <button className="btn btn-primary mt-2" type="submit">Create Project</button>
          </div>
      </form>
    )
}