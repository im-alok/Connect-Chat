import { io } from "socket.io-client"

export function socketConnection(){
    const ENDPOINTS = process.env.REACT_APP_SOCKET
    return io(ENDPOINTS);
}
