"use client"
import { ProjectType } from "@/utils/types";
import { useMutation } from "@apollo/client";
import { mutation } from "@/lib/gql/index";
import { useEffect, useState } from "react";
import { toISO } from "@/utils/dateConverter";
import { redirect } from 'next/navigation';
import getError from "@/utils/getErr";

export default function EditProject({projData, refetch} : {projData: ProjectType, refetch: Function}) {
  const [updateProj, {data, loading, error}] = useMutation(mutation.updateProjectMutation);
  const [removeProj] = useMutation(mutation.removeProjectMutation);
  const [isHidden, setIsHidden] = useState(true);

  const [form, setForm] = useState({
    updateProjectId: projData.id,
    name: projData.name,
    description: projData.description || "",
    isActive: projData.isActive,
    dueDate: projData.dueDate,
  });

  const update = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    try {
      await updateProj({variables: {...form}});
      refetch();
    } catch (error) {
      const err = getError(error);
      console.error(err);
    }
  }

  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      removeProj({variables: {removeProjectId: projData.id}});
      redirect('/user/dashboard')
    } catch (error) {
      const err = getError(error);
      console.error(err);
    }
  }

  return (
    <>
      <button onClick={(e) => {e.preventDefault();setIsHidden(!isHidden)}}>show edit page</button>
      <div hidden={isHidden}>
        <h1>edit project</h1>
        {loading? <p>loading...</p> : null}
        {error? <p>error...</p> : null}

        {projData? 
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

            <button onClick={(e) => update(e)}>
              click
            </button>
          </form>
          :
          <p>loading...</p>
        }

        <button onClick={(e) => remove(e)}>
          remove project
        </button>
      </div>
    </>
  )
}