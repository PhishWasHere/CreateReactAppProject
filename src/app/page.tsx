'use client'

import {useEffect, useState} from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { userAuth } from "@/utils/auth";

export default function Page() {
  useEffect(() => {
    if (userAuth.getUser() !== null) {
      redirect("/user/dashboard");
    }
  }, []);

  return (
    <>

      <div className="h-[100svh]">
        <section className="translate-x-[10svw] translate-y-[30svh] flex flex-col">
          <div>
            <p className="font-bold text-4xl">
              Welcome to
            </p>
            <h1 className="font-bold text-5xl">
              NEXT Project Manager
            </h1>
          </div>

          <article className="font-semibold">
            <p>
              This is a demo project for a project management web-app.
            </p>
            <p>
              This project is built with Next.js, Tailwind CSS, and Prisma with PostgreSQL.
            </p>
            <p className="text-sm font-semibold">
              (please note that this project is just a demo, and will probably not be maintained in the future)
            </p>
          </article>


          <div className="mt-3">
            <Link href="/signup" className="bg-[#FF9671] rounded-full hover:text-white hover:bg-[#FF6F91] transition duration-200 px-2 py-0.5 ">
              Give me a try!
            </Link>

            <Link href="/login" className="ml-1 text-sm">
              or Login
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
