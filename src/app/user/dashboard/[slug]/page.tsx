import { Metadata, ResolvingMetadata } from "next"
import { redirect } from "next/navigation";
import Dashboard from ".";
import { userAuth } from "@/utils/auth";


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata>{
  
  if (!params.slug) {
    return {
      title: "NPM Dashboard",
      description: "Next Project Manager Dashboard"
    }
  }

  const username = params.slug;
  return {
    title: `${username}'s dashboard`,
    description: "Next Project Manager Dashboard",
  } 
}

export default function Page() {
  
  return (
    <>
      <Dashboard />
    </>
  )
}