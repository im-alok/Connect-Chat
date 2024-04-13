import { io } from "socket.io-client"

export function socketConnection(){
    const ENDPOINTS = "http://localhost:4000"
    return io(ENDPOINTS);
}