import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSideBar = ({selectedUser}) => {
  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? 'max-md:hidden' : ''} `}>
        <div className='pt-16 text-xs flex flex-col items-center justify-center  gap-2 font-light'>
          <img src={ selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-20 aspect-[1/1] rounded-full '/>
          <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
            <p className='w-2 h-2 rounded-full bg-green-500'></p>
            {selectedUser.fullName}
            </h1>
            <p className='px-10 mx-auto '>{selectedUser.bio}</p>
        </div>
        <hr className='border-[#ffffff50] my-4'/>
        <div className='px-5 text-xs'>
            <p>Media</p>
            <div className='mt-3 max-h-[200px] overflow-y-scroll grid grid-cols-3 gap-3 opacity-70'>
                   {imagesDummyData.map((url,index)=>(
                       <div className='cursor-pointer rounded' key={index} onClick={()=>{window.open(url,'_blank')}}>
                            <img src={url} alt="" className='h-full rounded-md' />
                       </div>
                   ))}
            </div>
        </div>
        <button className='absolute  bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-sky-500 to-violet-500 text-white border-none text-sm  font-light py-2 px-20 rounded-full cursor-pointer' onClick={()=>{}}>Logout</button>
    </div>
  )
}

export default RightSideBar
