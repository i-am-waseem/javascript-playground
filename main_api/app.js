const express = require('express');

const app = express();

posts = {

}

app.use(express.json())

app.get("/posts", (req, res) => {
    res.send(posts)
})

app.post("/events", (req, res) => {
    switch(req.body.type) {
        case "post_created":
            console.log("POST CREATED!!!")
            const post = req.body.content
            posts[post.postId] = post
            res.sendStatus(200)
            break;
        case "comment_created":
            console.log("COMMENT CREATED!!!")
            const comment = req.body.content

            const postId = comment.postId
            const body = comment.body

            posts[postId].comments.push(body)

            res.sendStatus(200)

            break;
    }
})

app.listen(4002, "localhost", ()=> console.log("Listening on port 4002"))