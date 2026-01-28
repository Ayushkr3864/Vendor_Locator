import axios from "axios";
const api = import.meta.env.VITE_BACKEND_URL;

export const getMessages = (chatRoomId) =>
  axios.get(`${api}/chat/messages/${chatRoomId}`);

export const getChatRooms = () => axios.get("${api}/chat/rooms");
