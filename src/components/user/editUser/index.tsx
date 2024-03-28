'use client';

import { mutation } from "@/lib/gql";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UserType } from "@/utils/types";
import getError from "@/utils/getErr";
import { useRouter } from "next/navigation";
import { userAuth } from "@/utils/auth";
import { motion } from "framer-motion";

const vars = {
  open: () =>  ({ 
    opacity: 1, y: 0, zIndex: 2, 
    transition: {
      duration: 0.2, ease: "easeInOut"
    }
  }),
  closed: { 
    opacity: 0, y: "200%", backgroundColor: "rgba(0,0,0,0)", 
    transition: {
      duration: 0.2, ease: "easeInOut"
    }
  },
}

export default function EditUser({userData, refetch} : {userData: UserType | null, refetch: Function}) {
  const [updateUser, {data, loading, error}] = useMutation(mutation.updateUserMutation);
  const [removeUser] = useMutation(mutation.removeUserMutation);
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    name: userData?.data.username,
    email: userData?.data.email,
    password: "",
    confirmPassword: "",
  });

  const update = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    try {
      await updateUser({variables: form});
      refetch();
    } catch (error) {
      const err = getError(error)
      console.error(err);
    }
  }

  const remove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await removeUser({variables: {id: userData?.data.id}});
      userAuth.removeToken();
      router.push("/");
    } catch (error) {
      const err = getError(error);
      console.error(err);
    }
  }
  
  const togglePass = () => {
    setShowPass(!showPass);
  } 
  return (
    <>
      <div className="flex flex-col ml-auto mr-10 sm:ml-0 sm:mr-0">
        <button onClick={(e) => {e.preventDefault(); setIsOpen(!isOpen)}} className="font-medium text-sm mt-1 sm:mr-auto bg-[#FF9671] rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2">edit User</button>
        {loading? <p>loading...</p> : null}
        {error? <p>error...</p> : null}

        <motion.form animate={isOpen? "open" : "closed"} variants={vars} className="grid sm:w-[30svw] w-[100svw] bg-slate-300 border border-slate-600 rounded-lg p-2 absolute sm:-ml-0 -ml-[13svw]">
          <button className="fixed top-[2%] left-[96%]" onClick={(e => {e.preventDefault(); setIsOpen(false); })}>
            x
          </button>

          <p className="mt-1">Username</p>
          <input type="text" className="text-black" defaultValue={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
          />
          <p className="mt-1">Email</p>
          <input type="text" className="text-black" defaultValue={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
          <p className="mt-1">Password</p>
          <input type={showPass? "text" : "password"} className="text-black" placeholder={"password"}
            onChange={(e) => setForm({...form, password: e.target.value})}
          />
          <p className="mt-1">Confirm Password</p>
          <input type={showPass? "text" : "password"} className="text-black" placeholder={"password"}
            onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
          />

          <div className="flex mt-2">
            <button onClick={(e) => update(e)} disabled={loading || form.password !== form.confirmPassword} className="bg-[#FF9671] rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2">
              {loading ? "Loading..." : "Save"}             
            </button>
            <input type="checkbox" className="ml-auto" onClick={togglePass}/>Show Password


            <button onClick={(e) => remove(e)} className="ml-auto text-sm bg-[#ff2727a0] rounded-full hover:bg-[#b33636f9] transition duration-200 px-2">
              Delete User
            </button>
          </div> 
        </motion.form>

      </div>
    </>
  )
}