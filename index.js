const server = require("./server");


const PORT = 5001;
server.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})
