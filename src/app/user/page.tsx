'use client'
import { userAuth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page () {
  useEffect(() => {
    const data = userAuth.getUser();
    if (data) {
      redirect(`/user/dashboard/${data.data.username}`);
    }
    redirect('/user/login');
  }, []);
  return (
    <>
    </>
  )
}