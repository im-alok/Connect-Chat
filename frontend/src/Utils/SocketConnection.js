import { io } from "socket.io-client"

export function socketConnection(){
    const ENDPOINTS = "https://connect-chat-369l.onrender.com"
    return io(ENDPOINTS);
}
