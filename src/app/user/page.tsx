'use client'
export const dynamic = "force-dynamic";

import { useSuspenseQuery, useMutation, useQuery } from "@apollo/client";
import { query, mutation } from "@/lib/gql/index";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DataType, ProjectType } from "@/utils/types/index";


// todo: need to add redirect if not logged in
export default function Page () {
  const {data, loading, error} = useQuery(query.user);
  useEffect(() => {

    console.log("res ", data, loading, error);
    
  }, [data, loading, error]);

  return (
    <div>
      <h1>User route</h1>
      {loading? <p>loading...</p> : null}
      {error? <p>error... {error.toString()}</p> : null}
      { data?
        <>
          <h2>{data.user.name}</h2>
          <ul>
            {data.user.projects.map((p: ProjectType) => (
              <li key={p.id}>
                <div>{p.name}</div>
                <Link href={`/projects/${p.id}`}>View</Link>
              </li>
            ))}
          </ul>
        </>
        :
        null
      }
    </div>
  )
}