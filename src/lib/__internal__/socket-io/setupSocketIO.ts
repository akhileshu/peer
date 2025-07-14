import { Server, Socket } from "socket.io";

// Track connected userId -> socket.id
const userSockets = new Map<string, string>();

export function setupSocketIO(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    socket.on("register", (userId: string) => {
      userSockets.set(userId, socket.id);
    });

    socket.on(
      "send-notification",
      (data: { userId: string; message: string }) => {
        console.log("Sending notification :", { data });
        const targetSocketId = userSockets.get(data.userId);
        if (targetSocketId) {
          io.to(targetSocketId).emit("new-notification", {
            message: data.message,
          });
        }
      }
    );

    /*
    Socket.IO rooms - for group broadcasting

    Actors:
👤 Customer
🛵 Delivery partner
🧑‍🍳 Restaurant staff

Order ID/roomId: order_123

//  Server Setup
  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("leave-room", (roomId: string) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });

  📢 Emitting to a Room (Multiple Users)
  // Example: Notify all delivery partners of an order update
io.to("delivery-room").emit("notification", {
  type: "order_update",
  payload: {
    message: "Order #123 is ready for pickup",
  },
});

// frontend end
socket.emit("join-room", "delivery-room");
    */

    socket.on("disconnect", (reason) => {
      for (const [key, value] of userSockets.entries()) {
        if (value === socket.id) {
          userSockets.delete(key);
        }
      }
      console.log(`Client Disconnected: ${socket.id}, Reason: ${reason}`);
    });
  });
}
