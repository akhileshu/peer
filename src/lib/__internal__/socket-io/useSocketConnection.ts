import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
// import { socket } from "./socket";

/**
 * 
  * todo
     * socket.emit("register", userId); //Emitting an event (client sends an event to server)
    *  socket.on("new-notification", onNotification); //Listening for an event (client listens for server messages)

 */
export function useSocketConnection(
  onNotification?: (data: { message: string }) => void
) {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:3000"); // Ensure same port as server
    socketRef.current = socket;

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (t) => {
        setTransport(t.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    if (socket.connected) onConnect();

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.emit("register", "cm9sdn8r30000ovafydttl8ta");

    if (onNotification) {
      socket.on("new-notification", onNotification);
    }
    /* this setup wont work as emit needs to be done on events like button click etc , so use returned socket from useSocketConnection to emit events
    if (sendNotificationData) {
      socket.emit("send-notification", sendNotificationData as {
    userId: string;
    message: "Test Notification";
  });
    }

===========================================================
    // on returnig emit method  emit: socketRef.current?.emit.bind(socketRef.current),
        emit?.("send-notification", {
      userId,
      message: "Test Notification",
    });
===========================================================

| Point              | `io.to(...).emit(...)` (Backend push)                | `socket.emit("send-notification", ...)` (Frontend push) |
| ------------------ | ---------------------------------------------------- | ------------------------------------------------------- |
| **Triggered by**   | Server-side logic (e.g. DB change, order update)     | Client-side UI (button click, manual trigger)           |
| **Used for**       | Real business events (order placed, payment success) | Testing, admin tools, or user-triggered actions         |
| **Who emits**      | The backend/server (trusted source)                  | The frontend/client (user-side)                         |
| **Security**       | More secure and trusted                              | Less secure (user can misuse it if not validated)       |
| **Flow direction** | Server ➝ Client                                      | Client ➝ Server ➝ Client (indirect)                     |
| **Reliability**    | ✅ Direct, tied to backend logic                      | ❌ Can be abused, needs extra checks                     |

example
// orderService.ts
async function updateOrderStatus(orderId: string) {
  // business logic...
  const socketId = userSockets.get(userId);

  if (socketId) {
    io.to(socketId).emit("notification", {
      message: `Your order is now delivered`,
    });
  }
}


// in React UI
<button onClick={() => {
  socket?.emit("send-notification", {
    userId,
    message: "Hello from user!",
  });
}}>
  Trigger Notification
</button>

===========================================================

### 🔁 **General WebSocket Pattern**

#### 1. 🟢 **Frontend → emits**

User registers or joins room

```ts
socket.emit("register", userId);  
socket.emit("join-room", orderId);  
```

#### 2. 🟡 **Backend → handles emit and saves socket info**

```ts
socket.on("register", (userId) => userSockets.set(userId, socket.id));  
socket.on("join-room", (roomId) => socket.join(roomId));  
```

#### 3. 🔴 **Backend → pushes updates**

```ts
// Notify a specific user
io.to(userSockets.get(userId)).emit("notification", { ... });

// Notify all users in a room
io.to("order_123").emit("notification", { ... });
```

#### 4. 🔵 **Frontend → listens and updates UI**

```ts
socket.on("notification", (data) => {
  // update UI based on data
});
```

---

This separation keeps things clean:

* **Frontend only requests** to listen
* **Backend controls actual event broadcasting**

Want a diagram or simple working template for this?

    */

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      if (onNotification) socket.off("new-notification", onNotification); // ✅ clean up
      // socket.disconnect(); ❌ avoid this unless you're done with the socket ,  if you don’t need the socket anymore (e.g., app exit, user logout).
    };
  }, [onNotification]);

  return {
    isConnected,
    transport,
    socket: socketRef.current,
  };
}
