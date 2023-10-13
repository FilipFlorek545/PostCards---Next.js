'use client'
import '../../globals.css'
import React from "react";
import Link from "next/link";

export default function addPostLayout({
                                          children,
                                      }: {
    children: React.ReactNode
}) {
    return (
        <section className="flex justify-center h-screen flex-col align-middle ">
            {children}
            <div className="flex justify-center">
                <Link className="inline-block text-center duration-200 text-white
                  hover:text-black hover:bg-white hover:border-2-bla
                   my-10 mx-5 w-auto border-2 px-4 py-2" href="/">Back to posts</Link>
            </div>
        </section>
    )
}

