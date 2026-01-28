import { useEffect, useState } from "react";
import { socket } from "../../sockets/socket";
import { getMessages } from "../../api/chat";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatWindow = ({ chatRoom }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatRoom) return;

    socket.emit("joinRoom", chatRoom._id);

    getMessages(chatRoom._id).then((res) => {
      setMessages(res.data);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatRoom]);

  if (!chatRoom) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Select a chat
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} message={msg} />
        ))}
      </div>

      <MessageInput chatRoomId={chatRoom._id} />
    </div>
  );
};

export default ChatWindow;
