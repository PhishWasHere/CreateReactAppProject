import React, {useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT } from '../../../../utils/mutations';

export default function UpdateProject({projectId, name, description, status}) {
  
  const [updateProject, error] = useMutation(UPDATE_PROJECT);

  const [formState, setFormState] = useState({name: name || '', description: description || '', status: status || '' });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormState({
        ...formState,
        [name]: value,
    });
  };

  const handleSubmit = async (e) => {
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
    <form onSubmit={handleSubmit}  className='card mt-0 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
      <div onSubmit={handleSubmit} className="card-body">
        <div className="form-control ">
          <label className="label">
            <span>Project name</span>
          </label>
          <input type='text'
          name='name'
          value={formState.name}
          placeholder={name}
          onChange={handleChange}
          className="input input-bordered" 
          />
        </div>

        <div className="form-control ">
          <label className="label">
            <span>Project Description</span>
          </label>
          <input type='text'
          name='description'
          value={formState.description}
          placeholder={description}
          onChange={handleChange}
          className="input input-bordered" 
          />
        </div>

        <div className="form-control ">
          <label className="label">
            <span>Project Status</span>
          </label>
          <select 
            name='status'
            value={formState.status}
            placeholder={status}
            onChange={handleChange}
            className="input input-bordered" 
          >
            <option>Active</option>
            <option>Paused</option>
            <option>Completed</option>
          </select>
        </div>

        <button type="submit" className={
          !formState.name ||
          !formState.description ||
          !formState.status ? 'btn-primary opacity-50 rounded-lg' : 'btn-primary rounded-lg'}>Update proj</button>
      </div>
    </form>
  )
}