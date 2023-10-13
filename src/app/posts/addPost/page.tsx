'use client'

import React, {ChangeEvent, FormEvent, useState} from "react";
import {postInterface} from "@/app/helpers/interfaces";
import {useSearchParams} from "next/navigation";
import Link from "next/link";


export default function addPost(){
    const searchParams = useSearchParams()
    const newId = searchParams.get('currId')

    const [post, setPost] = useState<postInterface>({
        // @ts-ignore
        id: +newId,
        title: '',
        contents: '',
        date: '',
    })


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        if(name === 'postTitle'){
            setPost({
                ...post,
                date: new Date().toISOString().split('T')[0],
                title: value,
            });
        }
        else if (name === 'postContents'){
            setPost({
                ...post,
                date: new Date().toISOString().split('T')[0],
                contents: value,
            });
        }
    }

    const handleSubmit = (event:FormEvent) => {
        event.preventDefault()
        fetch('http://localhost:3000/add-data', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ post })
        })
            .then(response => response.json())
            .then(response => {response.data.push(post)})
        // let dataArray = JSON.parse(window.WSS.data)
        // dataArray.push(post)
    }

    return (
        <div>
                <div className="flex mx-auto flex-col">
                    <form onSubmit={handleSubmit}>
                        <label className="text-white block mb-5" htmlFor="postTitle"> Title:
                            <input onChange={handleChange}
                                   className="block text-black" name="postTitle" type="text"/>
                        </label>
                        <label className="text-white block mt-5" htmlFor="postContent">Contents:
                            <textarea onChange={handleChange}
                                      className="block w-full text-black" name="postContents" id=""></textarea>
                        </label>
                        <div onClick={handleSubmit}>
                        <Link className="inline-block text-center duration-200 text-white
                            hover:text-black hover:bg-white hover:border-2-black
                            my-10 mx-auto w-auto border-2 px-4 py-2" href={{
                                pathname: "/",
                        }}>
                           Submit
                        </Link>
                        </div>
                    </form>
                </div>
        </div>
    )
}
