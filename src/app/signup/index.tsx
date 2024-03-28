'use client'

import {useEffect, useState} from "react";
import { useMutation } from "@apollo/client";
import { mutation } from "@/lib/gql/index";

import { redirect } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [loginMutation, {data, loading, error}] = useMutation(mutation.signupMutation);
  const [form, setForm] = useState({
    name: "username",
    email: "example@email.com",
    password: "password",
  });
  const [showPass, setShowPass] = useState(false);

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
  }, [data, error]);


  const togglePass = () => {
    setShowPass(!showPass);
  }

  return (
    <div className="mt-[40svh]">


      <form className="grid sm:w-[30svw] mx-auto bg-slate-300 rounded-lg p-2">
        <h1 className=" text-xl font-semibold text-center mb-2">
          Signup
        </h1>
        
        <p className="mt-1">Username</p>
        <input type="text" className="text-black text-center rounded-lg" placeholder={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        <p className="mt-1">Email</p>
        <input type="text" className="text-black text-center rounded-lg" placeholder={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <p className="mt-1">Password</p>
        <input type={showPass? "text" : "password"} className="text-black text-center rounded-lg" placeholder={"password"}
          onChange={(e) => setForm({...form, password: e.target.value})}
        />

        <div className="flex mt-2">
          <button onClick={(e) => login(e)} className="bg-[#FF9671] rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2 " disabled={loading}>
            {loading ? "Loading..." : "Sign up"}
          </button>
          
          <Link href="/login" className="ml-1 mt-1 text-sm">
            or Login
          </Link>

          <input type="checkbox" className="ml-auto" onClick={togglePass}/>Show Password
        </div>
      </form>
      
      {error? <p className="text-center text-red-500">Oops, something went wrong, please try again </p> : null}
    </div>
  )
}