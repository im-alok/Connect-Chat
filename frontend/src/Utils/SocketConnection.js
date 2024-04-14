import { io } from "socket.io-client"

export function socketConnection(){
    const ENDPOINTS = "http://connect-chat-369l.onrender.com"
    return io(ENDPOINTS);
}
