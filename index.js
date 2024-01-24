const express = require("express")
const { default: mongoose } = require("mongoose")
const users = require("./src/Models/users")
const { register, login, findUser } = require("./src/Controllers/auth")
const cors = require("cors");
const { verifyToken, ValidateForm, isValidated } = require("./src/Middlewares");
const { addForm } = require("./src/Controllers/Form");
const { sendEmail } = require("./src/Helper/Email")
const http = require("http")
const { Server } = require("socket.io");


const server = express()
const app = http.createServer(server)
const io = new Server(app)

server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {

    res.status(200).json({
        name: "abc",
        age: 40
    })
})
server.post("/register", register)
server.post("/login", login)

io.on("connection", socket => {
    console.log("new user connected");
    socket.on("message", (message, room) => {
        console.log(`New message received in ${room} and message is ${message}`);
        socket.to(room).emit("message", message)
    })
    socket.on("join", (room) => {
        console.log(room);
        socket.join(room)
        socket.emit("joined")
    })
})



server.get("/get-user", verifyToken, findUser)

server.post("/addForm", ValidateForm, isValidated, addForm, sendEmail)


app.listen("3000", () => {
    console.log("Server started")
})



mongoose.connect("mongodb://localhost:27017/CMS").then(() => {
    console.log("DB connected")
}).catch((error) => {
    console.log(error)
})