'use client';

import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { mutation } from "@/lib/gql/index";
import { toISO } from "@/utils/dateConverter";
import getError from "@/utils/getErr";

export default function CreateTask({ id, refetch }:{ id: string | string[], refetch: Function}) {
  const [newTask, {data, loading, error}] = useMutation(mutation.createTaskMutation);
  const [form, setForm] = useState({
    projectId: id,
    name: "task name",
    description: "task description",
    isActive: true,
    dueDate: undefined as unknown as string,
  });

  const [isHidden, setIsHidden] = useState(true);

  const convertDate = (d: string) => {
    const iso = toISO(d);
    form.dueDate = iso;
  }

  const create = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await newTask({variables: form});
      refetch();
    } catch (error) {
      const err = getError(error);
      console.error(err);
    }
  }
  
  return (
    <>
      {loading? <p>loading...</p> : null}
      {error? <p>error...</p> : null}
      <button onClick={(e) => {e.preventDefault();setIsHidden(!isHidden)}}>create task</button>
      
      <form hidden={isHidden}>
        <input type="text" className="text-black" placeholder={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        <input type="text" className="text-black" placeholder={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}
        />

        <button onClick={
          (e) => {e.preventDefault(); setForm({...form, isActive: !form.isActive})}
        }
        >
          {form.isActive.toString()} is active
        </button>

        <input type="datetime-local" className="text-black" placeholder={form.dueDate}
          onChange={(e) => convertDate(e.target.value)}
        />
        
        <button onClick={(e) => create(e)}>
          click
        </button>
      </form>
    </>
  )
}