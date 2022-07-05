import { Socket } from "socket.io";

export function messSocket(socket: Socket){
  console.log("messSocket",socket.id)
  socket.on("mess",(payload)=>{
    console.log("mess", payload);
    console.log("Connecting to socket: " + socket.id);
    socket.emit("mess", { message: "Hello from server" });
  })
  socket.on("mess",(payload)=>{
    console.log("on mess2", payload);
  })
 
  return
}