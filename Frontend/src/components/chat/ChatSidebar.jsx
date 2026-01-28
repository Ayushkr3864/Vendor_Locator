import { useEffect, useState } from "react";
import { getChatRooms } from "../../api/chat";

const ChatSidebar = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getChatRooms().then((res) => setRooms(res.data));
  }, []);
useEffect(() => {
  getChatRooms().then((res) => {
    console.log("Chat rooms response:", res.data);
    setRooms(res.data);
  });
}, []);

  return (
    <div className="w-1/4 border-r overflow-y-auto">
      {rooms?.map((room) => (
        <div
          key={room._id}
          onClick={() => onSelectRoom(room)}
          className="p-4 cursor-pointer hover:bg-gray-100"
        >
          <p className="font-semibold">
            {room.vendor?.businessName || room.user?.name}
          </p>
          <p className="text-sm text-gray-500">{room.lastMessage?.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
