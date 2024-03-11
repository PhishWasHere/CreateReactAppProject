'use client'
export const dynamic = "force-dynamic";

import { useSuspenseQuery, useMutation, useQuery } from "@apollo/client";
import { query, mutation } from "@/lib/gql/index";
import { DataType, ProjectType } from "@/utils/types";

// prob dont need this page as i can just use the "user" page
export default function Page () {
  const {data} = useQuery(query.projects);
  
  return (
    <div>
      <h1>Page</h1>

    </div>
  )
}