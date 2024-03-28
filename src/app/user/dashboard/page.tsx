'use client'

import {useEffect, useState} from "react";
import { redirect } from "next/navigation";
import { userAuth } from "@/utils/auth";

export default function Page() {

  useEffect(() => {
    const data = userAuth.getUser();
    if (data !== null) {
      redirect(`/user/dashboard/${data.data.username}`);
    }
    redirect('/user/login');
  }, []);

  return (
    <>
    </>
  )
}