const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {post} = require("server/router");

const app = express();

app.use(cors());
app.use(bodyParser.json());

let postEntries = [
    {   id: 0,
        title:'Initial post!',
        contents: 'This is my initial post!',
        date: '2023-03-05'
    },
    {
        id: 1,
        title:'Second post!',
        contents: 'This is my second post.',
        date: '2023-05-25'
    },
    {
        id: 2,
        title:'Third post!',
        contents: 'This is my third post. It is kinda long, so its going to be truncated in postCard.',
        date: '2023-07-01'
    },
    {
        id: 3,
        title:'Newest post!',
        contents: 'This is my latest post.',
        date: '2023-09-19'
    },
]

app.get('/posts', (req, res) => {
    const responseData = {
        message: 'Posts fetched successfully!',
        data: postEntries,
    };
    res.json(responseData);
});
app.get('/posts/post/:postId', (req, res) => {
    const postId = req.params.postId
    const post = postEntries.find(entry => entry.id === +postId);
    const responseData = {
        message: 'Post fetched successfully!',
        data: post,
    };
    res.json(responseData);
});

app.post('/add-post', (req, res) => {
    const newPost = req.body.post;
    postEntries.push(newPost);
    const responseData = {
        message: 'Post added successfully!',
        data: postEntries,
    };
    res.json(responseData);
});

app.patch('/delete-post/:postId', (req, res) => {
    const postId = req.params.postId;
    postEntries = postEntries.filter(entry => {
        return entry.id !== +postId
    });
    const responseData = {
        //create print responseData function
        message: 'Post deleted successfully!',
        data: postEntries,
    };
    res.json(responseData)
})

app.patch('/update-post/:postId', (req, res) => {
    const newVal = req.params.postId
    const tarEl = postEntries.find(el => el.id === +newVal)
    let tarPos = postEntries.indexOf(tarEl)
    postEntries.splice(tarPos, 1, req.body)
    const responseData = {
        message: 'Post updated successfully!',
        data: postEntries
    }
    res.json(responseData)
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// const http = require('http');
// const ws = require('ws');
//
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('WebSocket server is running');
// });
//
// const wss = new ws.Server({ noServer: true });
//
// let postEntries = [
//     {   id: 0,
//         title:'Initial post!',
//         contents: 'This is my initial post!',
//         date: '2023-03-05'
//     },
//     {
//         id: 1,
//         title:'Second post!',
//         contents: 'This is my second post.',
//         date: '2023-05-25'
//     },
//     {
//         id: 2,
//         title:'Third post!',
//         contents: 'This is my third post. It is kinda long, so its going to be truncated in postCard.',
//         date: '2023-07-01'
//     },
//     {
//         id: 3,
//         title:'Newest post!',
//         contents: 'This is my latest post.',
//         date: '2023-09-19'
//     },
// ]
//
//
// function accept(req, res) {
//     if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() !== 'websocket') {
//         res.end();
//         return;
//     }
//     if (!req.headers.connection.match(/\bupgrade\b/i)) {
//         res.end();
//         return;
//     }
//     wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
// }
// function onConnect(ws) {
//     ws.on('message', function () {
//         ws.send(JSON.stringify(postEntries));
//     });
// }
// wss.on('connection', onConnect);
//
// server.on('upgrade', accept);
//
// if(!module.parent){
//     server.listen(3000, () => {
//         console.log('Server is running on http://localhost:3000');
//     });
// }
// else{
//     exports.accept = accept;
// }