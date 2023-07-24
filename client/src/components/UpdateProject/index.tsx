import React, {useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function UpdateProject({projectId}: any) {
    const { id } = useParams();
    console.log(projectId);
    
    const [updateProject, error] = useMutation(UPDATE_PROJECT);

    const [formState, setFormState] = useState({name: '', description: '', status: '' });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    const handleSubmit = async (e: any) => {
        try {
            await updateProject({
                variables: {
                    projectId: projectId,
                    ...formState
                },
            });
        } catch (err) {
            console.log(err);   
        }
    };
    
    return(
        <form onSubmit={handleSubmit} className="card-body ">
            <div className="form-control ">
              <label className="label">
                <span>Task name</span>
              </label>
              <input type='text'
              name='name'
              value={formState.name}
              placeholder='Task name'
              onChange={handleChange}
              className="input input-bordered" 
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span>Task Description</span>
              </label>
              <input type='text'
              name='description'
              value={formState.description}
              placeholder='Task Description'
              onChange={handleChange}
              className="input input-bordered" 
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span>Status</span>
              </label>
              <input type='text'
              name='status'
              value={formState.status}
              placeholder='status'
              onChange={handleChange}
              className="input input-bordered" 
              />
            </div>

          <button type="submit">Update proj</button>
        </form>
    )
}