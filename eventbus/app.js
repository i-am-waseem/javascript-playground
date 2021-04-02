const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.json())

app.post("/events", (req, res) =>{
    axios.post("http://localhost:4000/events", req.body).then().catch(err => console.log("Posts Error",err))
    axios.post("http://localhost:4001/events", req.body).then().catch(err => console.log("Comment Error", err))
    axios.post("http://localhost:4002/events", req.body).then().catch(err => console.log("Main_API", err))
})

app.listen(4005, "localhost", () => console.log("Listening on port 4005"))
