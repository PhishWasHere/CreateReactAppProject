import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../../../../utils/mutations';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AddTask() {
  const { id } = useParams();

  const [formState, setFormState] = useState({name: '', description: '', dueDate: '', priority: 'Low', status: 'Not Started'});
  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormState({
          ...formState,
          [name]: value,
      });
  };

  const [addTask, {  error }] = useMutation(ADD_TASK);

  const handleSubmit = async (e) => {
    e.preventDefault();      
    try {
      const { data } = await addTask({
        variables: {
          projectId: id, 
          ...formState
        },
      });        
      setFormState({name: '', description: '', dueDate: '', priority: 'Low', status: 'Not Started'});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card mt-0 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
              <span>Due Date (MM / DD / YYYY)</span>
            </label>
            <input type='text'
            name='dueDate'
            value={formState.dueDate}
            placeholder='MM / DD / YYYY'
            onChange={handleChange}
            className="input input-bordered" 
            />
          </div>
          {error ? (<div>
            <p className="text-red-500 break">Please use the format: MM/DD/YYYY</p>
          </div>) : null}

          <div className="form-control ">
            <label className="label">
              <span>Task Priority</span>
            </label>
            <select className='select select-bordered'
            name='priority'
            value={formState.priority}
            onChange={handleChange}
            >
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </select>
          </div>

        <button className="btn btn-primary mt-2" type="submit">Create Task</button>
      </form>
    </div>
  );
};