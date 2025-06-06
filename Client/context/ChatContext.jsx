import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});


  const {socket,axios} = useContext(AuthContext);

  //function to get all user for sidebar
  const getUsers =async ()=>{
    
     try {
         const {data} = await axios.get('/api/messages/user')
         if(data.success){
            setUsers(data.users);
            setUnseenMessages(data.unseenMessages);
         }else{
            toast.error("Failed to load users.");
         }
     } catch (error) {
          toast.error(error.message);
     }
  }

  //function to get all messages for selected user
    const getMessages = async (userId) => {
        try {
        const { data } = await axios.get(`/api/messages/${userId}`);
        console.log("Get Messages API response:", data);
        if (data.success) {
            setMessages(data.messages);
        }
        } catch (error) {
        toast.error(error.message);
        }
    };

    //function to send message
    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);

            if(data.success) {
                setMessages((prevMessages) => [...prevMessages, data.newMessage]);
                socket.emit("sendMessage", data.message);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    //function to subscribe to messages for selected user
    const subscribeToMessages = () => {
        if(!socket) return;

        socket.on("newMessage", (newMessage) => {
            if(selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true; 
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }else{
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages,
                    [newMessage.senderId]: prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId]+1 : 1
                }));
            }
    })
    }

    //function to unsubscribe from messages
    const unsubscribeFromMessages = () => {
        if(socket)  socket.off("newMessage");
    }

    useEffect(() => {
        subscribeToMessages();
        return () => unsubscribeFromMessages();

    },[socket, selectedUser]);

  const value={
         messages,users,selectedUser,getUsers,getMessages,
         setSelectedUser,sendMessage,setMessages,unseenMessages,setUnseenMessages
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}