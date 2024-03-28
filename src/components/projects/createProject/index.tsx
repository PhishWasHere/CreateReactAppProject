"use client"

import { useState} from "react";

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

export default function CreateProject({ refetch } : { refetch:Function }) {
  const [newProject, {data, loading, error}] = useMutation(mutation.createProjectMutation);
  const [form, setForm] = useState({
    name: "name",
    description: "description",
    dueDate: undefined as unknown as string,
  });

  const [isOpen, setIsOpen] = useState(false)

  const convertDate = (d: string) => {
    if (!d) return;

    const iso = toISO(d);
    form.dueDate = iso;
  }

  const update = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await newProject({variables: {...form}});
      setForm({
        name: "name",
        description: "description",
        dueDate: undefined as unknown as string,
      });

      refetch();
    } catch (error) {
      const err = getError(error);
      console.error(err);
    }
  }

  return (
    <div className="flex">

      <button className="flex">
        <span onClick={(e) => {e.preventDefault(); setIsOpen(!isOpen); }} className="font-medium text-sm mt-1 sm:mr-auto bg-[#FF9671] rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2">Create a project</span>
      </button>
      
      <motion.form className="grid sm:w-[30svw] w-[100svw] bg-slate-300 border border-slate-600 rounded-lg p-2 absolute" animate={isOpen? "open" : "closed"} variants={vars}>
        
        <button className="fixed top-[2%] left-[96%]" onClick={(e => {e.preventDefault(); setIsOpen(false); })}>
          x
        </button>

        <p className="mt-1">Project Name</p>
        <input type="text" className="text-black" placeholder="some name"
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        <p className="mt-1">Project Description</p>
        <input type="text" className="text-black" placeholder="some description"
          onChange={(e) => setForm({...form, description: e.target.value})}
        />
        <p className="mt-1">Due Date</p>
        <input type="datetime-local" className="text-black" placeholder={form.dueDate}
          onChange={(e) => convertDate(e.target.value)}
        />


        <div className="flex mt-2">
          <button 
            onClick={(e) => update(e)}
            className="bg-[#FF9671] rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2"
            disabled={form.name === undefined || form.description === undefined || form.dueDate === undefined || loading}  
          >
            {loading ? "Loading..." : "Create"}             
          </button>
        </div>

        {error? <p>error...</p> : null}

      </motion.form>
    </div>
  )
}