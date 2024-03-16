'use client'

import { useEffect, useState } from "react"
import { useQuery, useSuspenseQuery } from "@apollo/client";
import { query } from "@/lib/gql/index";
import { toLocal } from "@/utils/dateConverter";
import { TaskType } from "@/utils/types";

export default function Project({ id }: { id: string | string[] }) {
  const {data, loading, error} = useQuery(query.project, { variables: { projectId: id } });

  useEffect(() => {
    if (data) {
      console.log(data.project);
    } 
  }, [data, loading, error])
  return  (
    <div>
      <h1>Project</h1>
      { error && <p>Error: {error.message}</p>}
      { loading && <p>Loading...</p>}
      { data && (
        <div>
          <h2>{data.project.name}</h2>
          <p>{data.project.description}</p>
          <p>{toLocal(data.project.dueDate)}</p>

          <div>tasks: </div>
          {data.project.tasks.map((task: TaskType) => (
            <div key={task.id}>
              <h3>{task.name}</h3>
              <p>{task.description}</p>
              <p>{toLocal(task.dueDate)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}