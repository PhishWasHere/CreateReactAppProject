import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../../utils/queries';

import Auth from '../../utils/auth';
import { Link, Navigate, useParams } from 'react-router-dom';

export default function Projects() {

  const { loading, data } = useQuery(QUERY_PROJECTS, {
    variables: { userid: Auth.getProfile().data._id  },
  });  

  const user = data?.user || [];
  const projects = data?.projects || [];
  console.log(data, user);
  

  if(!Auth.loggedIn()) {
    return <Navigate to="/" />;
  }

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
                <p>Number of Tasks: {project.tasks?.length || 0 }</p>
              </div>
              <Link key={project._id} to={`/projects/${project._id}`}>
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
