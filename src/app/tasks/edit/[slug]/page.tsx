'use client'

import {useEffect, useState} from "react";

import { useSuspenseQuery, useMutation, useQuery } from "@apollo/client";
import { query, mutation } from "@/lib/gql/index";
import { ParentType } from "@/utils/types";
import { toISO } from "@/utils/dateConvertor";

// todo: turn into component that takes in id as args
export default function Page({ params }: { params: { slug: string } }) {
  const t = useQuery(query.task, { variables: { taskId: params.slug } });
  const [removeTask] = useMutation(mutation.removeTaskMutation);

  const [updateTask, {data, loading, error}] = useMutation(mutation.updateTaskMutation);

  const [form, setForm] = useState({
    updateTaskId: params.slug,
    name: "",
    description: "",
    isActive: true,
    dueDate: undefined as unknown as string,
  });

  useEffect(() => {
    if (t.data) {
      const {name, description, isActive, dueDate} = t.data.task;
      setForm({updateTaskId: params.slug, name, description, isActive, dueDate});
    }
  
  }, [t.data]);

  const convertDate = (d: string) => {
    const iso = toISO(d);
    form.dueDate = iso;
  }

  const click = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    try {
      const a = await updateTask({variables: {...form}});
      console.log(a);
      
    } catch (error) {
      console.log(error);
    }
  }

  const remove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeTask({variables: {removeTaskId: params.slug}});
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>edit task</h1>
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
          {form.isActive.toString()} is active
        </button>

        <input type="datetime-local" className="text-black" defaultValue={form.dueDate}
          onChange={(e) => convertDate(e.target.value)}
        />
        
        <button onClick={(e) => click(e)}>
          click
        </button>
        </form>
        :
        <p>loading...</p>
      }


      <button onClick={(e) => remove(e)}>
        remove task
      </button>
    </main>
  );
}
