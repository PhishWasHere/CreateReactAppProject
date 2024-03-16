'use client'

import {useEffect, useState} from "react";
import { redirect } from "next/navigation";

import { useMutation } from "@apollo/client";
import { mutation } from "@/lib/gql/index";
import { userAuth } from "@/utils/auth";

export default function Page() {

  // useEffect(() => {
  //   const data = userAuth.getUser();    
  //   if (data) {
  //     redirect(`/dashboard/${data.data.username}`);
  //   }
  // }, []);

  const [login, {data, loading, error}] = useMutation(mutation.loginMutation);
  const [form, setForm] = useState({
    name: "username",
    email: "email",
    password: "password",
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
    if (data){      
      userAuth.setToken(data.login.token);
      redirect(`/user/dashboard/${data.login.user.name}`);
    } else {
      userAuth.removeToken();
    }
  }, [data, error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Login route</h1>
      {loading? <p>loading...</p> : null}
      <form className="">
        {error? <p>incorrect credentials </p> : null}
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
