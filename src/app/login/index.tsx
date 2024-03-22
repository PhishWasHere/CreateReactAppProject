'use client'

import {useEffect, useState} from "react";
import { redirect } from "next/navigation";

import { useMutation } from "@apollo/client";
import { mutation } from "@/lib/gql/index";
import { userAuth } from "@/utils/auth";
import getError from "@/utils/getErr";

export default function Login() {

  // useEffect(() => {
  //   const data = userAuth.getUser();    
  //   if (data) {
  //     redirect(`/dashboard/${data.data.username}`);
  //   }
  // }, []);

  const [loginMutation, {data, loading, error}] = useMutation(mutation.loginMutation);
  const [form, setForm] = useState({
    name: "username",
    email: "email",
    password: "password",
  });

  const login = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    
    try {
      await loginMutation({variables: form});

    } catch (error) {
      const err = getError(error);
      console.error(err);
    }
  }

  useEffect(() => {
    if (error) {
      userAuth.removeToken();
    }
    
    if (data){
      userAuth.setToken(data.login.token);
      redirect(`/user/dashboard/${data.login.user.name}`);
    }
  }, [data, error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Login route</h1>

      {loading? <p>loading...</p> : null}
      <form className="">
        {error? <p>incorrect credentials </p> : null}
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
  );
}
