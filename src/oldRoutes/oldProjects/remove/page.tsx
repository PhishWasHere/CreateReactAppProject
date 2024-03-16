'use client'
export const dynamic = "force-dynamic";
import Image from "next/image";
import {useEffect, useState} from "react";
import cookie from "js-cookie";

import { useSuspenseQuery, useMutation } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import { query, mutation } from "@/lib/gql/index";

// todo: turn into component that takes in id as args
export default function Page() {
  const [removeProj, {data, loading, error}] = useMutation(mutation.removeProjectMutation);
  const [form, setForm] = useState({
    removeProjectId: "934e8cce-d0e3-44a5-9a0c-9367abb2ddd6",
  });

  const click = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    try {
      await removeProj({variables: {...form}});
      console.log("project removed");
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>remove project</h1>
      {loading? <p>loading...</p> : null}
      {error? <p>error...</p> : null}

      <button onClick={e => {
        click(e);
      }}> 
        click
      </button>
    </main>
  );
}
