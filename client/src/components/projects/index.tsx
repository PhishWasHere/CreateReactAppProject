import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { Link, useParams } from 'react-router-dom';

export default function Projects() {

  const {username: userParam} = useParams<any>();
  console.log('userParam', userParam);

  const { loading, data } = useQuery(QUERY_ME, {
    variables: { username: userParam  },
  });  
  console.log('data', data);
  
  const projects = data?.projects || [];


  return (
    <section>
      <h1>Projects</h1>
      <div className="flex-row">
      {loading ? (
            <div>Loading...</div>
          ) : (
            projects.map((project: any) => (
              <div key={project._id} className="card mb-3 bg-primary text-black">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {project.name}
                </h4>
                <div className="card-body bg-light p-2">
                  <p>{project.description}</p>
                  <p>Number of Tasks: {project.tasks.length}</p>
                </div>
                <Link key={project._id} to={{pathname: `/projects/${project._id}` }}>
                  <button className="btn btn-primary btn-block btn-squared">
                    View Project
                  </button>
                </Link>
              </div>
            ))
          )}
      </div>
    </section>
  );
}