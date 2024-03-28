"use client"
import { ProjectType } from "@/utils/types";
import { useMutation } from "@apollo/client";
import { mutation } from "@/lib/gql/index";
import { useState } from "react";
import { toISO } from "@/utils/dateConverter";
import { redirect, useRouter } from 'next/navigation';
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
    opacity: 0, x: "-100%", backgroundColor: "rgba(0,0,0,0)", zIndex: -10,
    transition: {
      duration: 0.2, ease: "easeInOut"
    }
  },
}

export default function EditProject({projData, refetch} : {projData: ProjectType, refetch: Function}) {
  const [updateProj, {data, loading, error}] = useMutation(mutation.updateProjectMutation);
  const [removeProj] = useMutation(mutation.removeProjectMutation);
  const router = useRouter(); // cant use retirect() in try/catch block
  const [isOpen, setIsOpen] = useState(false)

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
      setForm({
        updateProjectId: projData.id,
        name: projData.name,
        description: projData.description || "",
        isActive: projData.isActive,
        dueDate: projData.dueDate,
      });
      setIsOpen(false);
    } catch (error) {
      const err = getError(error);
      console.error(err);
    }
  }

  const convertDate = (d: string) => {
    if (!d) return;
    
    const iso = toISO(d);
    form.dueDate = iso;
  }

  const remove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {      
      await removeProj({variables: {removeProjectId: projData.id}});
      router.push('/user/dashboard');
    } catch (error) {
      const err = getError(error);
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col sm:mr-0 sm:ml-0 ml-10">
      <button className="flex">
        <span onClick={(e) => {e.preventDefault(); setIsOpen(!isOpen); }} className="font-medium text-sm bg-[#FF9671] mx-auto rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2">Edit Project</span>
      </button>

      {loading? <p>loading...</p> : null}
      {error? <p>error...</p> : null}

      <motion.form className="grid sm:w-[30svw] w-[100svw] bg-slate-300 border border-slate-600 rounded-lg p-2 absolute sm:ml-0 -ml-[11svw]" animate={isOpen? "open" : "closed"} variants={vars}>
        
        <button className="fixed top-[2%] left-[96%]" onClick={(e => {e.preventDefault(); setIsOpen(false); })}>
          x
        </button>

        <p className="mt-1">Project Name</p>
        <input type="text" className="text-black" placeholder={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />

        <p className="mt-1">Project Description</p>
        <input type="text" className="text-black" placeholder={form.description}
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
            Project
          </p>
        </div>

        <div className="flex mt-2">
          <button onClick={(e) => update(e)} disabled={loading} className="bg-[#FF9671] rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2">
          {loading ? "Loading..." : "Save"}             
          </button>

          <button onClick={(e) => remove(e)} className="ml-auto text-sm bg-[#ff2727a0] rounded-full hover:bg-[#b33636f9] transition duration-200 px-2">
            Delete Project
          </button>
        </div> 
      </motion.form>

    </div>
  )
}