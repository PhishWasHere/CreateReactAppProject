'use client'

import {useEffect, useState} from "react";

import { useSuspenseQuery, useMutation, useQuery } from "@apollo/client";
import { query, mutation } from "@/lib/gql/index";
import { ParentType } from "@/utils/types";
import { toISO } from "@/utils/dateConvertor";

// todo: turn into component that takes in id as args
export default function Page({ params }: { params: { slug: string } }) {
  const t = useQuery(query.project, { variables: { projectId: params.slug } });  
  const [updateProj, {data, loading, error}] = useMutation(mutation.updateProjectMutation);
  const [removeProj] = useMutation(mutation.removeProjectMutation);

  const [form, setForm] = useState({
    updateProjectId: params.slug,
    name: '',
    description: "",
    isActive: false,
    dueDate: '',
  });

  useEffect(() => {
    if (t.data) {
      setForm({
        updateProjectId: params.slug,
        name: t.data.project.name,
        description: t.data.project.description || "",
        isActive: t.data.project.isActive,
        dueDate: t.data.project.dueDate,
      });
    }
  }, [t.data]);

  const click = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    try {
      await updateProj({variables: {...form}});

    } catch (error) {
      console.log(error);
    }
  }

  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeProj({variables: {removeProjectId: params.slug}});
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>edit project</h1>
      {loading? <p>loading...</p> : null}
      {error? <p>error...</p> : null}

      {t.data? 
        <form className="">
          <input type="text" className="text-black" defaultValue={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
          />
          <input type="text" className="text-black" defaultValue={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
          />

          <button onClick={
              (e) => {e.preventDefault(); setForm({...form, isActive: !form.isActive})}
            }
          >
            {form.isActive.toString()}
          </button>

          <input type="datetime-local" className="text-black" defaultValue={form.dueDate}
            onChange={(e) => {
              e.preventDefault();
              const date = toISO(e.target.value);
              setForm({...form, dueDate: date})
            }}
          />

          <button onClick={(e) => click(e)}>
            click
          </button>
        </form>
        :
        <p>loading...</p>
      }

      <button onClick={(e) => remove(e)}>
        remove project
      </button>
    </main>
  );
}
