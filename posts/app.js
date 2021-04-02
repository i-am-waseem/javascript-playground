const express = require('express')
const axios = require('axios')

const app = express()

let posts = {}
app.use(express.json())

app.get("/posts", (req, res) => {
    res.sendStatus(200)
})

app.post("/posts", (req, res) => {
    // posts[req.body.postId] = req.body
    axios.post("http://localhost:4005/events", {
        type: "post_created",
        content: req.body
    })

    res.sendStatus(200)
})

app.post("/events", (req, res) => {
    switch(req.body.type){
        
    }
})
app.listen(4000, ()=>  "listening on port 4000")

