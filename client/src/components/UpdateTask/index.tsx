import React, {useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function UpdateTask({taskId}: any) {
    const { id } = useParams();

    console.log(taskId);

    const [updateTask, error] = useMutation(UPDATE_TASK);

    const [formState, setFormState] = useState({name: '', description: '', dueDate: '', priority: 'Low', status: 'Not Started'});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await updateTask({
                variables: {
                    projectId: id,
                    taskId: taskId,
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
              <span>Due Date</span>
            </label>
            <input type='text'
            name='dueDate'
            value={formState.dueDate}
            placeholder='Due Date'
            onChange={handleChange}
            className="input input-bordered" 
            />
          </div>

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

          {/* change once task made */}
          <div className="form-control ">
            <label className="label">
              <span>Task Status</span>
            </label>
            <input type='text'
            name='status'
            value={formState.status}
            placeholder='Task Status'
            onChange={handleChange}
            className="input input-bordered" 
            />
          </div>

          <button type="submit">Update proj</button>
        </form>
    )
}