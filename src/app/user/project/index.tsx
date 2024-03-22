'use client'

import { useEffect } from "react"
import { useQuery } from "@apollo/client";
import { query } from "@/lib/gql/index";
import { toLocal } from "@/utils/dateConverter";
import { TaskType } from "@/utils/types";
import EditProject from "@/components/projects/edit";
import CreateTask from "@/components/tasks/createTask";
import EditTask from "@/components/tasks/editTask";
import { notFound } from 'next/navigation';

export default function Project({ id }: { id: string | string[] }) {
  const {data, loading, error, refetch} = useQuery(query.project, { variables: { projectId: id } });

  useEffect(() => {
    if (!loading){
      if (!data) return notFound();
    }
  }, [data, loading]);

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
              <EditTask taskData={task} refetch={refetch}/>
            </div>
          ))}
          <EditProject projData={data.project} refetch={refetch}/>
          <CreateTask id={id} refetch={refetch}/>
        </div>
      )}
    </div>
  )
}