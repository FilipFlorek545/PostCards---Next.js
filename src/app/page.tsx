'use client'
import PostCard from "@/app/components/PostCard";
import Link from "next/link";
import {truncate} from "@/app/helpers/truncate";
import {useEffect, useState} from "react";
import {postInterface} from "@/app/helpers/interfaces";
import {next} from "sucrase/dist/types/parser/tokenizer";
// import {postSocket} from "@/app/helpers/Ws";
// postSocket()

export default function Home() {

    const [newData, setNewData] = useState<postInterface[]>([])
    let [nextId, setNextId] = useState(0)
    useEffect(() => {
        fetch('http://localhost:3000/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((data) => {
                setNewData(data.data)
                setNextId(data.data[data.data.length -1]?.id +1)
            })
    },[])
        //try removing setTimeout
    // if(newData.length === 0) {
    //     setTimeout(() => {
    //         // @ts-ignore
    //         let dataArray = JSON.parse(window.WSS.data)
    //         setNewData(dataArray)
    //     }, 100)
    // }
    return (
            <main>
                <div className="flex h-1/5">
                    <Link className="h-11 text-center duration-200 text-white
                        hover:text-black hover:bg-white hover:border-2-black
                        my-10 mx-auto w-auto border-2 px-4 py-2"
                        href={{ pathname: "/posts/addPost", query: {currId: nextId || 0}}}>Add a new post!</Link>
                </div>
              <div className="flex justify-center flex-col-reverse">
                  {newData.map((post) => {
                  return (
                  <PostCard key={post.id} id={post.id} title={truncate(post.title, 20)} date={post.date} contents={truncate(post.contents, 50)}/>
                );
                })}
              </div>
            </main>
  )
}
