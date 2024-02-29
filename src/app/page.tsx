'use client'
export const dynamic = "force-dynamic";
import Image from "next/image";
import {useEffect, useState} from "react";
import cookie from "js-cookie";

import { useSuspenseQuery, useMutation } from "@apollo/client";

import { gql, useQuery } from "@apollo/client";
import { query, mutation } from "@/lib/gql/index";
import {userAuth} from "@/utils/auth";

export default function Home() {

  const [test, {data, loading, error}] = useMutation(mutation.removeUserMutation);
  const [form, setForm] = useState({
    name: "",
    email: "email@email",
    password: "pass",
  });

  const click = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    try {
      await test({variables: {removeUserId: "1"}});

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(data);

  }, [data]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading? <p>loading...</p> : null}
      {error? <p>error...</p> : null}
      <form className="">
        <input type="text" className="text-black"
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
