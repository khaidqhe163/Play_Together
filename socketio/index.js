// const { Server } = require("socket.io");
import { Server } from "socket.io";
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

    socket.on("sendPrivateMessage", (message) => {
        console.log(message);
        const user = onlineUsers.find((o) => {
            return o.userId === message.receiverId;
        })
        console.log(user);
        if (user) {
            io.to(user.socketId).emit("getNewMessagePrivate", message)
        }
    })

    socket.on("sendNotification", (notification) => {
        console.log(notification);
        if (notification?.receivers) {
            const users = onlineUsers.filter((o) => {
                return notification.receivers?.includes(o.userId)
            })
            console.log(users);
            if (users) {
                users.forEach((u) => {
                    io.to(u.socketId).emit("getNotification", notification)
                })
            }
        }
    })
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        console.log(onlineUsers);
        io.emit("getOnlineUsers", onlineUsers);
    });
});

io.listen(5000)