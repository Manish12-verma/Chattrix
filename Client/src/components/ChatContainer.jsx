import React, { useContext } from 'react'
import assets from '../assets/assets'
import Chat from './Chat'
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';


const ChatContainer = () => {
  
  const {selectedUser, setSelectedUser} = useContext(ChatContext);
  const {onlineUsers} = useContext(AuthContext);
  
  

  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg '>
      {/* Header Section */}
        <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
              <img src={selectedUser.profilePic || assets.avatar_icon} alt="user_image" className='w-8 rounded-full '/>
              <p className='flex-1 text-lg text-white flex items-center gap-2'>{selectedUser.fullName}
               {onlineUsers.includes(selectedUser._id) && <span className='w-2 h-2 rounded-full bg-green-500'></span>}
              </p> 
              <img src={assets.arrow_icon} alt="" className='md:hidden max-w-7' onClick={()=>{setSelectedUser(null)}}/>
              <img src={assets.help_icon} alt="help_icon" className='max-md:hidden max-w-5' />
        </div>
        {/* Chat Messages Section */}
        <Chat/>
    </div>
  ) :(
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10  max-md:hidden'>
      <img src={assets.chattrix_logo_png} alt="logo" className='max-w-40'/>
      <p className='text-2xl font-bold pt-4 text-white'>Chat beyond limits!</p>
    </div>
  )
}

export default ChatContainer
