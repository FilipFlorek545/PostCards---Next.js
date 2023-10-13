import React from "react";
import Link from "next/link";
import {postInterface} from "@/app/helpers/interfaces";


export default function PostCard ({id, title, contents, date}: postInterface) {

    return(
        <Link className="my-10 mx-auto w-3/12 min-w-[250px]"
              href = '../posts/[postId]'
              as={`/posts/${id}`}>
            <div className="border-4 border-white rounded-xl duration-200 hover:scale-105">
                <div className="mx-10 my-5 ">
                    <p className="text-white text-xs mb-4">{date}</p>
                    <h2 className="font-bold text-3xl text-white mb-3">{title}</h2>
                    <p className="text-sm text-white">{contents}</p>
                </div>
            </div>
        </Link>
    )
}