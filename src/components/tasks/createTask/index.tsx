'use client';

import {  useState } from "react";
import { useMutation } from "@apollo/client";
import { mutation } from "@/lib/gql/index";
import { toISO } from "@/utils/dateConverter";
import getError from "@/utils/getErr";
import { motion } from "framer-motion";

const vars = {
  open: () =>  ({ 
    opacity: 1, x: 0, zIndex: 2,
    transition: {
      duration: 0.2, ease: "easeInOut"
    }
  }),
  closed: { 
    opacity: 0, x: "-200%", backgroundColor: "rgba(0,0,0,0)", zIndex: -10,
    transition: {
      duration: 0.2, ease: "easeInOut"
    }
  },
}

export default function CreateTask({ id, refetch }:{ id: string | string[], refetch: Function}) {
  const [newTask, {data, loading, error}] = useMutation(mutation.createTaskMutation);
  const [form, setForm] = useState({
    projectId: id,
    name: "",
    description: "",
    isActive: true,
    dueDate: undefined as unknown as string,
  });

  const [isOpen, setIsOpen] = useState(false)

  const convertDate = (d: string) => {
    if (!d) return;

    const iso = toISO(d);
    form.dueDate = iso;
  }

  const create = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await newTask({variables: form});
      refetch();
      setForm({
        projectId: id,
        name: "",
        description: "",
        isActive: true,
        dueDate: undefined as unknown as string,
      });
      setIsOpen(false);
    } catch (error) {
      const err = getError(error);
      console.error(err);
    }
  }
  
  return (
    <div className="flex flex-col ml-auto mr-10 sm:ml-0 sm:mr-0">
      {loading? <p>loading...</p> : null}
      {error? <p>error...</p> : null}
      <button onClick={(e) => {e.preventDefault(); setIsOpen(!isOpen);}} className="font-medium text-sm mx-auto sm:mr-auto bg-[#FF9671] rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2 mt-0 sm:mt-1">Create Task</button>
      
      <motion.form animate={isOpen? "open" : "closed"} variants={vars} className="grid sm:w-[30svw] w-[100svw] bg-slate-300 border border-slate-600 rounded-lg p-2 absolute sm:-ml-0 -ml-[63svw]">

        <button className="fixed top-[2%] left-[96%]" onClick={(e => {e.preventDefault(); setIsOpen(false); })}>
          x
        </button>

        <p className="mt-1">Task Name</p>
        <input type="text" className="text-black" placeholder={"task name"}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        
        <p className="mt-1">Task Description</p>
        <input type="text" className="text-black" placeholder={"task description"}
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
          <button onClick={(e) => create(e)} disabled={loading || !form.name || !form.description} className="bg-[#FF9671] rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2">
            {loading ? "Loading..." : "Create"}             
          </button>
        </div>
        {error? <p>error: ${error.toString()}</p> : null}
      </motion.form>
    </div>
  )
}