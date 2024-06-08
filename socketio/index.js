const { Server } = require("socket.io");
const io = new Server({ cors: "http://localhost:3000" });

let onlineUsers = []
io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    socket.on("addNewUser", (userId) => {
        console.log(userId);
        !onlineUsers.some((user) => user.userId === userId) && userId !== null &&
            onlineUsers.push({
                userId: userId,
                socketId: socket.id
            });
        console.log("onlineUsers", onlineUsers);
        io.emit("getOnlineUsers", onlineUsers)
    });

    socket.on("sendGlobalMessage", (message) => {
        io.emit("getNewMessage", message)
    })
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        console.log(onlineUsers);
        io.emit("getOnlineUsers", onlineUsers);
    });
});

io.listen(5000)