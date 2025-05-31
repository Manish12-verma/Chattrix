import React ,{useEffect, useRef} from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils';

const Chat = () => {
    const scrollEnd = useRef(null);

    useEffect(()=>{
       if(scrollEnd.current){
           scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
       }
    },[]);

  return (
    <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messagesDummyData.map((message, index) => (
            <div key={index} className={`flex items-end gap-2 justify-end ${message.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`}>
               {message.image ? (
                <img src={message.image} alt="image" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'/>
               ):(
                <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30  text-white ${message.senderId ==='680f50e4f10f3cd28382ecf9' ? 'rounded-br-none':'rounded-bl-none'}`}> {message.text}</p>
               )}
               <div className='text-center text-xs '>
                   <img src={message.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin} alt="" className='w-7 rounded-full' />
                    <p className='text-gray-500'>{formatMessageTime(message.createdAt)}</p>
                </div>
            </div>
        ))}
        <div ref={scrollEnd}>
        </div>
    {/* bottom area */}
    <div className='absolute bottom-0 left-0 right-0 flex items-center gap-1 p-3 '>
          <div class="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            type="text"
            placeholder="Send a message"
            class="flex-1 w-full h-full p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 text-sm"
          />
          <input type="file" id='image' accept='image/png ,image/jpeg ,image/jpg' hidden/>
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="gallery_icon" className='w-5 mr-2 cursor-pointer'/>
          </label>
        </div>
        <img src={assets.send_button} alt="" className='h-9 cursor-pointer'/>
    </div>
    </div>
  )
}

export default Chat
