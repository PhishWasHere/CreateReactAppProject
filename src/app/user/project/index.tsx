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
    <>
      { error && <p>Error: {error.message}</p>}
      { loading && <p>Loading...</p>}
      { data && (
        <section>
          <section className="bg-slate-300 sm:h-[100svh] sm:w-[13svw] sm:absolute break-words">
            <div className="flex sm:block">
              <h1 className="font-semibold text-2xl">{data.project.name}</h1>
              <p className="text-sm sm:mb-1 sm:mt-0 mt-2 sm:ml-0 ml-auto">{toLocal(data.project.dueDate)}</p>
            </div>
            <p>{data.project.description}</p>

            <div className="flex sm:block">
              <EditProject projData={data.project} refetch={refetch}/>
              <CreateTask id={id} refetch={refetch}/>
            </div>
          </section>

          <article className="sm:translate-x-[13svw]">
            <div>tasks: </div>
            <ul className="flex overflow-auto flex-wrap">
              {data.project.tasks.map((t: TaskType) => (
                <li key={t.id} className={`mt-2 ${t.isActive ? "border-[#62a5c5]" : "border-[#FF6F91]"} bg-slate-300 border-2 rounded-lg p-2 break-words m-1 max-w-[100svw] sm:max-w-[25svw]`}>
                  <h4 className=" font-semibold">{t.name}</h4>
                  <p className="font-medium">{t.description}</p>
                  <div className="flex mt-1">
                    <EditTask taskData={t} refetch={refetch}/>
                    <p className="text-sm font-light ml-auto mt-1">{toLocal(t.dueDate)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}
    </>
  )
}