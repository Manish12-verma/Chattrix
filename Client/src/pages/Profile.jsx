import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';

const Profile = () => {
  const [selectedImg,setSelectedImg] = useState(null)
  const navigate = useNavigate();
  const [name,setName] = useState('Martin Johnson');
  const [bio,setBio] = useState('Hy,I am Martin Johnson, a software engineer with a passion for building innovative solutions. I love coding and exploring new technologies. In my free time, I enjoy hiking and photography.');

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/');
  }
  return (
    <div className ='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
       <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg '>
          <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
              <h3 className='text-lg text-white'>Profile details</h3>
              <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
                <input onChange={(e)=>{setSelectedImg(e.target.files[0])}} type="file" id='avatar' accept='.png ,.jpg,.jpeg' hidden/>
                <img src={selectedImg ? URL.createObjectURL(selectedImg):assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImg && 'rounded-b-full'}`} required/>
                upload profile picture
              </label>
              <input type="text" required placeholder='Your name...' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500' onChange={(e)=>{setName(e.target.value)}} value={name}/>
              <textarea onChange={(e)=>{setBio(e.target.value)}} value={bio} placeholder='Write portfolio bio' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500' rows={4} required></textarea>
              <button type='submit' className='bg-gradient-to-r from-sky-400 to-violet-600 text-white p-2 rounded-full  text-lg cursor-pointer'>Save</button>
          </form>
          <img src={assets.chattrix_logo_png} alt="" className='max-w-44   mx-10 max-sm:mt-10' />
       </div>
    </div> 
  )
}

export default Profile
