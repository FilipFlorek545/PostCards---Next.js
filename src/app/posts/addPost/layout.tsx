import '../../globals.css'
import React from "react";
import Link from "next/link";

export default function addPostLayout({
                                          children,
                                      }: {
    children: React.ReactNode
}) {
    return (
        <section className="flex justify-center flex-col align-middle w-3/12 mx-auto">
            <h2 className="text-white my-8 text-4xl">Add a post</h2>
            {children}
            <Link className="inline-block text-center duration-200 text-white
          hover:text-black hover:bg-white hover:border-2-black
           my-10 mx-auto w-auto border-2 px-4 py-2" href="/">Back to posts</Link>
        </section>
    )
}

