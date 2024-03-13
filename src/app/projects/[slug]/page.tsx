'use client'
export const dynamic = "force-dynamic";

import { useSuspenseQuery, useMutation } from "@apollo/client";
import { query, mutation } from "@/lib/gql/index";
import Link from "next/link";

import { ProjectType } from "@/utils/types/index";
import { toLocal } from "@/utils/dateConvertor";

// todo: toLocale causing server/client mismatch
export default function Page({ params }: { params: { slug: string } }) {
  const {data}: {data: ProjectType} = useSuspenseQuery(query.project, { variables: { projectId: params.slug } });

  const {project} = data;
    
  return (
   <>
    <Link href={`/projects/edit/${params.slug}`}>
      edit
    </Link>
    <div>{project.name}</div>
    <div>{project.description}</div>
    <div>{toLocal(project.dueDate)}</div>
    <div>{project.isActive}</div>
    <div>{project.user.id}</div>
    {project.tasks ? 
      <div>
        {project.tasks.map((t: any) => (
          <div key={t.id}>
            <div>{t.name}</div>
            <div>{t.description}</div>
            <div>{toLocal(t.dueDate)}</div>
            <div>{t.isActive}</div>
            <Link href={`/tasks/edit/${t.id}`}>
              edit
            </Link>
          </div>
        ))}
      </div>
    : null}

    <Link href={`/tasks/new/${params.slug}`}>
      add task
    </Link>
   </>
  )
}
