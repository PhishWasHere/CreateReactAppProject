import { Metadata } from "next"

import SignUp from "."

export async function generateMetadata(): Promise<Metadata>{

  return {
    title: `Sign Up to Next Project Manager`,
    description: "Next Project Manager Sign Up Page",
  }
}

export default function Page() {
  return (
    <>
      <SignUp/>
    </>
  )
}