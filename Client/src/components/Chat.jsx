import React ,{useContext, useEffect, useRef, useState} from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Chat = () => {
    const scrollEnd = useRef(null);
    const [input, setInput] = useState(""); 
    const {selectedUser,messages,sendMessage,getMessages} = useContext(ChatContext);
    const {authUser} = useContext(AuthContext);
      
    //handle sending image
    const handleSendImage = async (e) => {
         const file = e.target.files[0];
         if(!file || !file.type.startsWith("image/")) {
          toast.error("Please select a valid image file.");
          return;
         }
         const reader = new FileReader();
         reader.onloadend=async()=>{
          await sendMessage({image:reader.result});
          e.target.value = ""; // Clear the input after sending
         }
        reader.readAsDataURL(file); // Convert image to base64
    }
    
   
    // Function to handle sending messages
    const handleSendMessage =async(e) => {
         e.preventDefault();
         if(input.trim() === "") return; // Prevent sending empty messages
         await sendMessage({text:input.trim()});
         setInput(""); // Clear input after sending
    }
    useEffect(()=>{
      if(selectedUser){
        getMessages(selectedUser._id);
      }
    },[selectedUser])

    useEffect(()=>{
       if(scrollEnd.current && messages.length > 0) {
           scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
       }

    },[messages]);

  return (
    <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messages.map((message, index) => (
            <div key={index} className={`flex items-end gap-2 justify-end ${message.senderId !== authUser._id && 'flex-row-reverse'}`}>
               {message.image ? (
                <img src={message.image} alt="image" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'/>
               ):(
                <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30  text-white ${message.senderId ===authUser._id ? 'rounded-br-none':'rounded-bl-none'}`}> {message.text}</p>
               )}
               <div className='text-center text-xs '>
                   <img src={message.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon :selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-7 rounded-full' />
                    <p className='text-gray-500'>{formatMessageTime(message.createdAt)}</p>
                </div>
            </div>
        ))}
        <div ref={scrollEnd}>
        </div>
    {/* bottom area */}
    <div className='absolute bottom-0 left-0 right-0 flex items-center gap-1 p-3 '>
          <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e)=>e.key==="Enter"? handleSendMessage(e):null}
            type="text"
            placeholder="Send a message"
            className="flex-1 w-full h-full p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 text-sm"
          />
          <input onChange={handleSendImage} type="file" id='image' accept='image/png ,image/jpeg ,image/jpg' hidden/>
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="gallery_icon" className='w-5 mr-2 cursor-pointer'/>
          </label>
        </div>
        <img onClick={handleSendMessage} src={assets.send_button} alt="" className='h-9 cursor-pointer'/>
    </div>
    </div>
  )
}

export default Chat
