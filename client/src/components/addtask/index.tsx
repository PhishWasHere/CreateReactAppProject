import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../../utils/mutations';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Auth from '../../utils/auth';

export default function AddTask() {
    const { id } = useParams();
 
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Low');
    const [status, setStatus] = useState('Not Started');
  
    const [addTask, { data, error }] = useMutation(ADD_TASK);
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      console.log(
        name, description, dueDate, priority, status, id
      );
      
      try {
        const { data } = await addTask({
          variables: {
            projectId: id, // Replace this with your project ID
            name,
            description,
            dueDate,
            priority,
            status
          },
        });
        console.log('data', data);
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Task title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            placeholder="Task Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <textarea
            placeholder="Task Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
          <textarea
            placeholder="Task Priority"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <button type="submit">Create Task</button>
        </form>
      </div>
    );
  };