import { io } from "socket.io-client";

// Use your server's URL or localhost
const socket = io("http://localhost:4000");

export default socket;
