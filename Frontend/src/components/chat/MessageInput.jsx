import { useState } from "react";
import { socket } from "../../sockets/socket";
import { useAuth } from "../../store/auth";

const MessageInput = ({ chatRoomId }) => {
  const [text, setText] = useState("");
  const { user, role } = useAuth(); // role = User / Vendor

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      chatRoom: chatRoomId,
      sender: user._id,
      senderModel: role,
      text,
    });

    setText("");
  };

  return (
    <div className="p-3 border-t flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
        placeholder="Type a message..."
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
