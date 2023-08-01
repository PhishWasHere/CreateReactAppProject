import React from "react";

import Login from '../login';

export default function Front() {
    return (
    <main className="my-auto flex justify-center">
        <div className="hero min-h-screen w-11/12 justify-center">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <article className="text-center lg:text-left sm:ml-5 w-7/12">
                    <h1 className="text-5xl font-bold">C.R.A.P</h1>
                    <p className="py-6">C.R.A.P is one of the Project Managers of all time! <br/> Login now! </p>
                </article>

                <Login/>
            </div>
        </div>
    </main>
    )
}