'use client'
import { mutation } from "@/lib/gql";
import { toISO } from "@/utils/dateConverter";
import getError from "@/utils/getErr";
import { TaskType } from "@/utils/types"
import { useMutation } from "@apollo/client";
import { useState } from "react";

export default function EditTask({taskData, refetch}:{taskData: TaskType, refetch: Function}) {
  const [removeTask] = useMutation(mutation.removeTaskMutation);
  const [isHidden, setIsHidden] = useState(true);
  const [updateTask, {data, loading, error}] = useMutation(mutation.updateTaskMutation);

  const [form, setForm] = useState({
    updateTaskId: taskData.id,
    name: taskData.name,
    description: taskData.description,
    isActive: taskData.isActive,
    dueDate: undefined as unknown as string,
  });

  const convertDate = (d: string) => {
    const iso = toISO(d);
    form.dueDate = iso;
  }

  const update = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    try {
      await updateTask({variables: {...form}});
      refetch();
    } catch (error) {
      const err = getError(error);
      console.error(err);
    }
  }

  const remove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await removeTask({variables: {removeTaskId: taskData.id}});
    refetch();
  }
  
  return (
    <>
      <button onClick={(e) => {e.preventDefault(); setIsHidden(!isHidden);}}>edit Task</button>
      <div hidden={isHidden}>
        <h1>edit task</h1>
        {loading? <p>loading...</p> : null}
        {error? <p>error...</p> : null}

        {taskData? 
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
          
          <button onClick={(e) => update(e)}>
            click
          </button>
          </form>
          :
          <p>loading...</p>
        }


        <button onClick={(e) => remove(e)}>
          remove task
        </button>
      </div>
    </>
  )
}