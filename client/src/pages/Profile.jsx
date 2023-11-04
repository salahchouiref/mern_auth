import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {app} from "../firebase";
import { updateUserStart,updateUserSuccess,updateUserFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure } from '../redux/user/userSlice';

export default function Profile() {
  const {user} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image,setImage] = useState(undefined);
  const [imagePercent,setImagePercent] = useState(0);
  const [imageError,setImageError] = useState(false);
  const [formData,setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);

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
        })
      }
    );
  };

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id]:e.target.value});
  };
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${user.currentUser._id}`,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        updateUserFailure(data);
        return ;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(err){
      updateUserFailure(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const c = confirm("Are you sure that you want to delete you're account ?");
    if(c === true){
      try{
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${user.currentUser._id}`,{
          method : 'DELETE',
        });
        const data = await res.json();
        if(data.success === false){
          updateUserFailure(data);
          return ;
        }
        dispatch(deleteUserSuccess());
      }catch(err){
        updateUserFailure(err);
      }
    }
  }
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])} />
        <img src={formData.profilePicture || user.currentUser.profilePicture} alt="profile"
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
          <input type='text' onChange={handleChange} defaultValue={user.currentUser.username} id='username' placeholder='Username' className='bg-violet-100 rounded-lg p-3 ' />
          <input type='email' onChange={handleChange} defaultValue={user.currentUser.email} id='email' placeholder='Email' className='bg-violet-100 rounded-lg p-3 ' />
          <input type='password' onChange={handleChange} id='password' placeholder='Password' className='bg-violet-100 rounded-lg p-3 ' />
          <button disabled={user.loading} className='bg-violet-600 p-3 text-white uppercase hover:opacity-60 rounded-lg disabled:opacity-30'>
            {user.loading? "loading ..." : "update"}
          </button>
      </form>
      <div className='flex justify-between mt-3 font-bold'>
        <span className='text-red-500 cursor-pointer' onClick={handleDelete}>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-3'>{user.error && "Some went wrong!"}</p>
      <p className='text-green-700 mt-3'>{updateSuccess && "User updated successfuly"}</p>
    </div>
  )
}
