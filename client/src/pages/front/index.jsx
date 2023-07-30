import React from "react";

import Login from '../login';

export default function Front() {
    return (
    <main className="my-auto flex justify-center">
        <div className="hero min-h-screen w-11/12 justify-center">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <article className="text-center lg:text-left sm:ml-5 w-7/12">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </article>

                <Login/>
            </div>
        </div>
    </main>
    )
}