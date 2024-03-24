'use client'

import {useEffect, useState} from "react";
import { useMutation } from "@apollo/client";
import { mutation } from "@/lib/gql/index";

import { redirect } from "next/navigation";

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

      <h1 className=" text-xl font-semibold text-center mb-2">
        Signup Now
      </h1>

      <form className="grid sm:w-[30svw] mx-auto ">
        <input type="text" className="text-black mt-1 text-center rounded-lg" placeholder={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        <input type="text" className="text-black mt-1 text-center rounded-lg" placeholder={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <input type={showPass? "text" : "password"} className="text-black mt-1 text-center rounded-lg" placeholder={"password"}
          onChange={(e) => setForm({...form, password: e.target.value})}
        />

        <div className="flex mt-1">
          <button onClick={(e) => login(e)} className="bg-[#FF9671] rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2 " disabled={loading}>
            {loading ? "Loading..." : "Sign up"}
          </button>
          <input type="checkbox" className="ml-auto" onClick={togglePass}/>Show Password
        </div>
      </form>
      
      {error? <p className="text-center text-red-500">Oops, something went wrong, please try again </p> : null}
    </div>
  )
}