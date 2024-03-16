'use client'
export const dynamic = "force-dynamic";
import Image from "next/image";
import {useEffect, useState} from "react";

import { useSuspenseQuery, useMutation } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import { query, mutation } from "@/lib/gql/index";
import { toISO } from "@/utils/dateConverter";

export default function Home() {

  const [newProject, {data, loading, error}] = useMutation(mutation.createProjectMutation);
  const [form, setForm] = useState({
    name: "project name",
    description: "proj desc",
    dueDate: undefined as unknown as string,
  });

  const convertDate = (d: string) => {
    const iso = toISO(d);
    form.dueDate = iso;
  }

  const click = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await newProject({variables: {...form}});

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>new project</h1>
      {loading? <p>loading...</p> : null}
      {error? <p>error...</p> : null}
      <form className="">
        <input type="text" className="text-black" defaultValue={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        <input type="text" className="text-black" defaultValue={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}
        />
        <input type="datetime-local" className="text-black" defaultValue={form.dueDate}
          onChange={(e) => convertDate(e.target.value)}
        />

        <button onClick={(e) => click(e)}>
          click
        </button>
      </form>
    </main>
  );
}
