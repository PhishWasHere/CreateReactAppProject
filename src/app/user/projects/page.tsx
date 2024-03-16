import { Metadata, ResolvingMetadata } from "next"

import Project from "."

type Props = {
  params: { slug: string }
  searchParams: { [id: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams } : Props): Promise<Metadata>{
  if (!searchParams.id) {
    return {
      title: "NPM Project",
      description: "Next Project Manager Project"
    }
  }
  
  return {
    title: `${searchParams.name}`,
    description: "Next Project Manager Project",
  }
}

export default function Page({ params, searchParams } : Props) {  
  if (!searchParams.id) {
    return (
      <div>
        Project not found
      </div>
    ) 
  }
  

  return (
    <>
      <Project id={searchParams.id} />
    </>
  )
}