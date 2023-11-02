import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {app} from "../firebase";

export default function Profile() {
  const {user} = useSelector(state=>state.user);
  const fileRef = useRef(null);
  const [image,setImage] = useState(undefined);
  const [imagePercent,setImagePercent] = useState(0);
  const [imageError,setImageError] = useState(false);
  const [formData,setFormData] = useState({});

  console.log(formData);

  useEffect(()=>{
    if(image){
      handleFileUpload(image);
    }
  },[image]);

  const handleFileUpload = async (image) =>{
    const storage = getStorage(app);
    const filename = new Date().getTime()+image.name;
    const storageRef = ref(storage,filename);
    const uploadTask = uploadBytesResumable(storageRef,image);
    uploadTask.on('state_changed',(snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(Math.round(progress));
        setImagePercent(Math.round(progress))
      },
      (error)=>{
        setImageError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadUrl)=>{
          setFormData({...formData,profilePicture : downloadUrl});
          console.log(downloadUrl);
        })
      }

    );
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])} />
        <img src={user.currentUser.profilePicture} alt="profile"
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2' 
          onClick={()=>fileRef.current.click()}
          />
          <p className='text-sm self-center'>
            {imageError
            ?(<span className='text-red-700'>Error uploading image</span>)
            :imagePercent>0 && imagePercent<100 
            ? <span className='text-slate-700'>{`uploading: ${imagePercent} %`}</span> 
            :imagePercent===100?
            <span className='text-green-700'>Image uploaded successfully</span>
            : '' }
          </p>
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
