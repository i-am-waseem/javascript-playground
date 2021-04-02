const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.json())

posts = {
    "1" : {
        "postId" : "1",
        "postTitle":"My Post",
        "comments" : []
    }
}

// Get comments for the postId.
app.get("/:postId/comments", (req, res) =>{
    const postId = req.params.postId
    try{
        const post = posts[postId]
        res.status(200).send(post.comments)
    }catch(error){
        res.status(404).send("Requested Resource is not present")
    }
})

// Adding comments for the postId
app.post("/:postId/comments", (req,res) => {
    const postId = req.params.postId

    axios.post("http://localhost:4005/events", {
        type : "comment_created",
        content : {
            postId: postId,
            body : req.body
        }
    })
    res.sendStatus(200)
})

app.post("/events", (req, res) => {
    switch(req.body.type){
        
    }
})

app.listen(4001, "localhost", () => console.log("listening on port 4001"))

