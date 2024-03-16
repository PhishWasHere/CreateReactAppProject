'use client'
export const dynamic = "force-dynamic";
import {useEffect, useState} from "react";

import { useSuspenseQuery, useMutation } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import { query, mutation } from "@/lib/gql/index";

import { setContext } from "@apollo/client/link/context";
import { userAuth } from "@/utils/auth";

export default function Page() {

  const [login, {data, loading, error}] = useMutation(mutation.signupMutation);
  const [form, setForm] = useState({
    name: "name",
    email: "email@email",
    password: "pass",
  });

  const click = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    
    try {
      await login({variables: form});

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(data);
    // userAuth.setToken(data?.login.token);
    
  }, [data]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>signup route</h1>
      {loading? <p>loading...</p> : null}
      {error? <p>error...</p> : null}
      <form className="">
        <input type="text" className="text-black" defaultValue={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        <input type="text" className="text-black" defaultValue={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <input type="text" className="text-black" defaultValue={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
        />

        <button onClick={(e) => click(e)}>
          click
        </button>
      </form>

    </main>
  );
}
