"use client"

import {useEffect, useState} from "react";
import { useQuery } from "@apollo/client";
import { query } from "@/lib/gql/index";
import Link from "next/link";
import { ProjectType } from "@/utils/types/index";
import { toLocal } from "@/utils/dateConverter";
import CreateProject from "@/components/projects/createProject";
import { userAuth } from "@/utils/auth";
import EditUser from "@/components/user/editUser";

export default function Dashboard() {
  const {data, loading, error, refetch} = useQuery(query.projects);
  const userData = userAuth.getUser();

  useEffect(() => {
    if(userData?.data === null || undefined) {
      return console.log("couldnt find userdata");
    }
  }, [userData])

  return(
    <main>
      <h1>Dashboard route</h1>
      <EditUser userData={userData} refetch={refetch} />

      {loading? <p>loading...</p> : null}
      {error? <p>error... {error.toString()}</p> : null } 
      {data?
        data.projects.length === 0?     
          <>
            <CreateProject refetch={refetch} />
          </>
        :
        <>
          <h2>{data.name}</h2>
          <ul>
            {data.projects.map((p: ProjectType) => (
              <li key={p.id}>
                <div>{p.name}</div>
                <div>due:{toLocal(p.dueDate)}</div>
                {!p.tasks? <p>no tasks</p> : <p>{p.tasks.length} remaining tasks</p>}
                <Link href={`/user/project?id=${p.id}&name=${p.name}`}>View</Link>
              </li>
            ))}
          </ul>
          <CreateProject refetch={refetch} />
        </>
        :
     
        null
      }
    </main>
  )
}