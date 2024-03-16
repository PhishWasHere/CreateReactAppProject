"use client"

import {useEffect, useState} from "react";

import { useMutation } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import { query, mutation } from "@/lib/gql/index";
import { toISO } from "@/utils/dateConverter";

export default function CreateProject() {
  const [newProject, {data, loading, error}] = useMutation(mutation.createProjectMutation);
  const [form, setForm] = useState({
    name: "name",
    description: "description",
    dueDate: undefined as unknown as string,
  });

  // useEffect(() => {
  //   let d = new Date(0).toLocaleString( 'sv', { timeZoneName: 'short' } );
  //   d = d.slice(0, 16);
  //   setForm({...form, dueDate: d});
  // }, []);

  const convertDate = (d: string) => {
    const iso = toISO(d);
    form.dueDate = iso;
  }

  const click = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    try {
      await newProject({variables: {...form}});
      setForm({
        name: "name",
        description: "description",
        dueDate: undefined as unknown as string,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <p>Create A Project</p>
      {error? <p>error...</p> : null}
      {loading? <p>loading...</p> : 
        <form>
        <input type="text" className="text-black" placeholder={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
          />
          <input type="text" className="text-black" placeholder={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
          />
          <input type="datetime-local" className="text-black" placeholder={form.dueDate}
            onChange={(e) => convertDate(e.target.value)}
          />

          <button 
            onClick={(e) => click(e)}
            disabled={form.name === undefined || form.description === undefined || form.dueDate === undefined}  
          >
            click
          </button>
        </form>
      }
    </>
  )
}