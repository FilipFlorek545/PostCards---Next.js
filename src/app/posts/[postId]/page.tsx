'use client'
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {postInterface} from "@/app/helpers/interfaces";
import Link from "next/link";
import {useRouter} from "next/navigation";


export default function Page({params}: {params: {postId : number}}){
    const router = useRouter()
    const [postContents, setPostContents] = useState<postInterface>({
        id: 0,
        title: '',
        contents: '',
        date: '',
    })
    const [isEdited, setIsEdited] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/posts/post/${params.postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((data) => {
                console.log(data)
                setPostContents(data.data)
                console.log(postContents)
            })

        },[params.postId])



    const handleUpdate = () => {
        fetch(`http://localhost:3000/update-post/${params.postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postContents)
        }).then((response) => response.json())
        router.push('/')
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        if(name === 'postTitle'){
            setPostContents({
                ...postContents,
                title: value,
            });
        }
        else if (name === 'postContents'){
            setPostContents({
                ...postContents,
                contents: value,
            });
        }
    }

    const handleDelete = () => {
            fetch(`http://localhost:3000/delete-post/${params.postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => response.json())
        router.push('/')
    }

    return (
        <div>
            <div className="flex flex-col border-4 rounded-xl border-white p-[20px] min-w-[180px] w-3/12 mx-auto">
                <p className="text-white text-xs mb-4">{postContents.date}</p>
                {isEdited ?
                    <div>
                        <label className="text-white" htmlFor="">Title</label>
                        <input onChange={handleChange} value={postContents.title}
                               className="block my-1 box-border p-1 text-black w-full" name="postTitle" type="text"/>
                        <div>
                            <label className="text-white" htmlFor="">Contents</label>
                            <textarea onChange={handleChange} value={postContents.contents}
                                      className="block my-1 box-border p-1 text-black w-full h-20" name="postContents"/>
                        </div>
                        <div className="flex justify-evenly">
                            <button onClick={handleUpdate} className="inline-block text-center duration-200 text-white
                              hover:text-black hover:bg-white hover:border-2-bla
                               mt-10 mb-3 mx-auto w-[90px] border-2 px-4 py-2 disabled:opacity-25"
                                    disabled={!/^(?!\s*$)\s*[^ ].*$/.test(postContents.title) || !/^(?!\s*$)\s*[^ ].*$/.test!(postContents.contents)}
                            >Save</button>
                            <button onClick={handleDelete} className="inline-block text-center duration-200 text-white
                              hover:text-black hover:bg-white hover:border-2-bla
                               mt-10 mb-3 mx-auto w-[90px] border-2 px-4 py-2">Delete</button>
                        </div>
                    </div>
                    :
                    <div>
                        <h2 className="text-left mb-5 text-white">{postContents.title}</h2>
                        <div className="text-white">{postContents.contents}</div>
                        <div className="flex justify-evenly">
                            <button onClick={() => setIsEdited(true)} className="inline-block text-center duration-200 text-white
                              hover:text-black hover:bg-white hover:border-2-bla
                               mt-10 mb-3 mx-auto w-[90px] border-2 px-4 py-2 disabled:opacity-25"
                            >Update</button>
                            <button onClick={handleDelete} className="inline-block text-center duration-200 text-white
                              hover:text-black hover:bg-white hover:border-2-bla
                               mt-10 mb-3 mx-auto w-[90px] border-2 px-4 py-2">Delete</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
