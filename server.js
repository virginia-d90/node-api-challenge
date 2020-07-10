const express = require("express")
const server = express();

const projectRouter = require("./projects/projectRouter");
const actionRouter = require("./actions/actionRouter")

server.use(express.json())
server.use("/api/projects", projectRouter)
server.use("/api/actions", actionRouter)

server.get('/', (req, res) => (
    res.send(`<h2>Sprint test</h2>`)
))

module.exports = server;