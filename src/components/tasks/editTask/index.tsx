'use client'
import { mutation } from "@/lib/gql";
import { toISO } from "@/utils/dateConverter";
import getError from "@/utils/getErr";
import { TaskType } from "@/utils/types"
import { useMutation } from "@apollo/client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const vars = {
  open: () =>  ({ 
    opacity: 1, y: 0, zIndex: 2, 
    transition: {
      duration: 0.2, ease: "easeInOut"
    }
  }),
  closed: { 
    opacity: 0, y: "200%", backgroundColor: "rgba(0,0,0,0)", zIndex: -10,
    transition: {
      duration: 0.2, ease: "easeInOut"
    }
  },
}

export default function EditTask({taskData, refetch}:{taskData: TaskType, refetch: Function}) {
  const [removeTask] = useMutation(mutation.removeTaskMutation);
  const [updateTask, {data, loading, error}] = useMutation(mutation.updateTaskMutation);

  const [isOpen, setIsOpen] = useState(false)

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
      setIsOpen(false);
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
      <div className="flex flex-col ml-auto mr-10 sm:ml-0 sm:mr-0">
        {loading? <p>loading...</p> : null}
        {error? <p>error...</p> : null}
        <button onClick={(e) => {e.preventDefault(); setIsOpen(!isOpen)}} className="font-medium text-sm mt-1 sm:mr-auto bg-[#FF9671] rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2">edit Task</button>

        <motion.form animate={isOpen? "open" : "closed"} variants={vars} className="grid sm:w-[30svw] w-[100svw] bg-slate-300 border border-slate-600 rounded-lg p-2 absolute sm:-ml-0 -ml-[13svw]">

          <button className="fixed top-[2%] left-[96%]" onClick={(e => {e.preventDefault(); setIsOpen(false); })}>
            x
          </button>

          <p className="mt-1">Task Name</p>
          <input type="text" className="text-black" defaultValue={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
          />

          <p className="mt-1">Task Description</p>
          <input type="text" className="text-black" defaultValue={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
          />

          <div className="flex mt-1">
            <input type="datetime-local" className="text-black" placeholder={form.dueDate}
              onChange={(e) => {
                convertDate(e.target.value);
              }}
            />

            <p className="ml-auto">
              <button className={`sm:ml-auto ${form.isActive? "bg-[#62a5c5]" : "bg-[#FF6F91]"} rounded-lg px-1 transition duration-200`} onClick={
                (e) => {e.preventDefault(); setForm({...form, isActive: !form.isActive})}
              }
              >
                {form.isActive? "Active" : "Inactive"}
              </button>
              Task
            </p>
          </div>
          
        <div className="flex mt-2">
          <button onClick={(e) => update(e)} disabled={loading} className="bg-[#FF9671] rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2">
          {loading ? "Loading..." : "Save"}             
          </button>

          <button onClick={(e) => remove(e)} className="ml-auto text-sm bg-[#ff2727a0] rounded-full hover:bg-[#b33636f9] transition duration-200 px-2">
            Delete Task
          </button>
        </div> 
        
        </motion.form>
      </div>
    </>
  )
}