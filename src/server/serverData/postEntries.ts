import {postInterface} from "@/app/helpers/interfaces";

const postEntries: postInterface[] = [
    {   id: 1,
        title:'Initial post!',
        contents: 'This is my initial post!',
    },
    {
        id: 2,
        title:'Second post!',
        contents: 'This is my second post.',
    },
    {
        id: 3,
        title:'Third post!',
        contents: 'This is my third post. It is kinda long, so its going to be truncated in postCard.',
    },
    {
        id: 4,
        title:'Newest post!',
        contents: 'This is my latest post.',
    },
]

export { postEntries }