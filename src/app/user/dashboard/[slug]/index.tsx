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
import {notFound, redirect} from "next/navigation"

export default function Dashboard() {
  const {data, loading, error, refetch} = useQuery(query.projects);
  const userData = userAuth.getUser();

  useEffect(() => {    
    if(userData?.data === null ||userData?.data === undefined) {
      return redirect("/login");
    }

    if (!loading) {
      
      if (data === undefined || null) {
        return redirect("/login");
      }
    }

    refetch();
  }, [userData, data, loading])

  return(
    <>
      {loading? <p>loading...</p> : (
        <>
          {data.projects === undefined || null? null : (
            <>
              <h1>{userData?.data.username}&apos;s Dashboard</h1>
              <EditUser userData={userData} refetch={refetch} />

              {error? <p>error... {error.toString()}</p> : null } 
              
              <CreateProject refetch={refetch} />
              <section className="">
                {data?
                  data.projects.length === 0?     
                    <>
                      <h2>No projects</h2>
                    </>
                  :
                  <article className="justify-center">
                    <ul className="grid sm:grid-cols-3">
                      {data.projects.map((p: ProjectType) => (
                        <li key={p.id} className={`mt-2 ${p.isActive ? "border-[#62a5c5]" : "border-[#FF6F91]"} bg-slate-300 border-2 rounded-lg p-2 break-words m-1`}>
                          <div className="flex">
                            <h4 className="font-semibold">{p.name}</h4>
                            <p className="text-sm font-light ml-auto mt-1">{p.tasks.length} remaining tasks</p>
                          </div>

                          <p className="font-medium">{p.description}</p>

                          <div className="flex mt-1">
                            <Link href={`/user/project?id=${p.id}&name=${p.name}`} className="bg-[#FF9671] rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2">View</Link>
                            <p className="text-sm font-light ml-auto mt-1">Due:{toLocal(p.dueDate)}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </article>
                  :
                  null
                }
              </section>
            </>
          )}
        </>
      )}
    </>
  )
}