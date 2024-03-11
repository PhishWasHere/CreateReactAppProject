'use client'
export const dynamic = "force-dynamic";

import { useSuspenseQuery, useMutation } from "@apollo/client";
import { query, mutation } from "@/lib/gql/index";

import { ProjectType } from "@/utils/types/index";
import { toLocal } from "@/utils/dateConvertor";

export default function Page({ params }: { params: { slug: string } }) {
  const {data}: {data: ProjectType} = useSuspenseQuery(query.project, { variables: { projectId: params.slug } });

  const {project} = data;

  return (
   <>
    <div>{project.name}</div>
    <div>{project.description}</div>
    <div>{toLocal(project.dueDate)}</div>
    <div>{project.isActive}</div>
    <div>{project.user.id}</div>
    {project.tasks ? 
      <div>
        {project.tasks.map((t: any) => (
          <div key={t.id}>{t.name}</div>
        ))}
      </div>
    : null}
   </>
  )
}
