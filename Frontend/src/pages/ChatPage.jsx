import { useEffect, useState } from "react";
import { socket } from "../sockets/socket";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";

const ChatPage = () => {
  const [activeRoom, setActiveRoom] = useState(null);

useEffect(() => {
  if (!socket.connected) {
    socket.connect();
  }

//   return () => {
//     socket.disconnect();
//   };
}, []);



  return (
    <div className="h-screen flex">
      <ChatSidebar onSelectRoom={setActiveRoom} />
      <ChatWindow chatRoom={activeRoom} />
    </div>
  );
};

export default ChatPage;
