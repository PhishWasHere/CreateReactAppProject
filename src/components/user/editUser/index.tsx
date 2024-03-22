'use client';

import { mutation } from "@/lib/gql";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UserType } from "@/utils/types";
import getError from "@/utils/getErr";
import { redirect } from "next/navigation";
import { userAuth } from "@/utils/auth";

export default function EditUser({userData, refetch} : {userData: UserType | null, refetch: Function}) {
  const [updateUser, {data, loading, error}] = useMutation(mutation.updateUserMutation);
  const [removeUser] = useMutation(mutation.removeUserMutation);
  const [isHidden, setIsHidden] = useState(true);
  
  const [form, setForm] = useState({
    name: userData?.data.username,
    email: userData?.data.email,
    password: "",
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

  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeUser({variables: {id: userData?.data.id}});
    userAuth.removeToken();

    redirect('/')
  }

  return (
    <>
    <button onClick={(e) => {e.preventDefault(); setIsHidden(!isHidden);}}>edit user</button>
      <div hidden={isHidden}>
        <h1>Update route</h1>
        {loading? <p>loading...</p> : null}
        {error? <p>error...</p> : null}
        <form className="">
          <input type="text" className="text-black" defaultValue={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
          />
          <input type="text" className="text-black" defaultValue={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
          <input type="password" className="text-black" placeholder={"password"}
            onChange={(e) => setForm({...form, password: e.target.value})}
          />

          <button onClick={(e) => update(e)}>
            click
          </button>
        </form>

        <button onClick={(e) => {remove(e)}}> remove user </button>
      </div>
    </>
  )
}