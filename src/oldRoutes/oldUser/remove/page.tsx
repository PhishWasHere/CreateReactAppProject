'use client'
export const dynamic = "force-dynamic";
import Image from "next/image";
import {useEffect, useState} from "react";
import cookie from "js-cookie";

import { useSuspenseQuery, useMutation } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import { query, mutation } from "@/lib/gql/index";

export default function Page() {

  const [removeUser, {data, loading, error}] = useMutation(mutation.removeUserMutation);

  const click = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    
    try {
      await removeUser();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>remove route</h1>
      {loading? <p>loading...</p> : null}
      {error? <p>error...</p> : null}
      <form className="">

        <button onClick={(e) => click(e)}>
          click
        </button>
      </form>

    </main>
  );
}
