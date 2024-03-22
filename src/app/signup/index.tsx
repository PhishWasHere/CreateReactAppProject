'use client'

import {useEffect, useState} from "react";
import { useMutation } from "@apollo/client";
import { mutation } from "@/lib/gql/index";
import { userAuth } from "@/utils/auth";

import { redirect } from "next/navigation";

export default function SignUp() {
  const [loginMutation, {data, loading, error}] = useMutation(mutation.signupMutation);
  const [form, setForm] = useState({
    name: "name",
    email: "email@email",
    password: "pass",
  });

  const login = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    try {
      await loginMutation({variables: form});
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (data) {
      redirect(`/login`);
    }
  }, [data]);

  return (
    <main>
      <form className="">
        <input type="text" className="text-black" placeholder={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        <input type="text" className="text-black" placeholder={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <input type="text" className="text-black" placeholder={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
        />

        <button onClick={(e) => login(e)}>
          click
        </button>
      </form>
    </main>
  )
}