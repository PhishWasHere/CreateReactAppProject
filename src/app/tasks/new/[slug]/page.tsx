'use client'
export const dynamic = "force-dynamic";

import { useSuspenseQuery, useMutation } from "@apollo/client";
import { query, mutation } from "@/lib/gql/index";
import Link from "next/link";

import { ProjectType } from "@/utils/types/index";
import { toISO, toLocal } from "@/utils/dateConvertor";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {

  const [newTask, {data, loading, error}] = useMutation(mutation.createTaskMutation);
  const [form, setForm] = useState({
    projectId: params.slug,
    name: "task name",
    description: "task desc",
    isActive: true,
    dueDate: undefined as unknown as string,
  });

  const convertDate = (d: string) => {
    const iso = toISO(d);
    form.dueDate = iso;
  }


  const click = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await newTask({variables: form});

    } catch (error) {
      console.log(error);
    }
  }

  return (
   <>
      {loading? <p>loading...</p> : null}
      {error? <p>error...</p> : null}
      <form>
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
   </>
  )
}
