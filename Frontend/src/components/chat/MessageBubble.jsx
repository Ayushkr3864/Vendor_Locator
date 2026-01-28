import { useAuth } from "../../store/auth";

const MessageBubble = ({ message }) => {
  const { user } = useAuth();

  const isMine = message.sender === user._id;

  return (
    <div className={`mb-2 flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-xs
        ${isMine ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
