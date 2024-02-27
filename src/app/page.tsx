'use client'
import Image from "next/image";

import { gql, useMutation, useQuery } from "@apollo/client";
export const dynamic = "force-dynamic";
import { useSuspenseQuery } from "@apollo/client";

const querry = gql`query {
    Hello
  }
`

export default function Home() {
  const { data } = useSuspenseQuery(querry);

  const click = () => {
    console.log(data);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => click()}>
        click
      </button>
    </main>
  );
}
