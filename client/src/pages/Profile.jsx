import React from 'react';
import {useSelector} from "react-redux";
export default function Profile() {
  const {user} = useSelector(state=>state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={user.currentUser.profilePicture} alt="profile"
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'/>
          <input type='text' defaultValue={user.currentUser.username} id='username' placeholder='Username' className='bg-violet-100 rounded-lg p-3 ' />
          <input type='email' defaultValue={user.currentUser.email} id='email' placeholder='Email' className='bg-violet-100 rounded-lg p-3 ' />
          <input type='password' id='password' placeholder='Password' className='bg-violet-100 rounded-lg p-3 ' />
          <button type='button' className='bg-violet-600 p-3 text-white uppercase hover:opacity-60 rounded-lg disabled:opacity-30'>update</button>
      </form>
      <div className='flex justify-between mt-3 font-bold'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
