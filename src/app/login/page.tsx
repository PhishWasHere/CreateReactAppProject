import { Metadata } from "next"

import Login from '.'

export async function generateMetadata(): Promise<Metadata>{

  return {
    title: `Login to Next Project Manager`,
    description: "Next Project Manager Login Page",
  }
}

export default function Page() {
  return (
    <>
      <Login />
    </>
  )
}