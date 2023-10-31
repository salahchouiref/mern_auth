import React from 'react';
import {GoogleAuthProvider,signInWithPopup,getAuth} from "@firebase/auth";
import {app} from "../firebase.js";
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function () {
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);
            const res = await fetch("/api/auth/google",{
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    name : result.user.displayName, // NB
                    email : result.user.email,
                    photo : result.user.photoURL, 
                })
            });
            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
        }catch(error){
            console.log("could not login with google",error);
        }
    }
  return (
    <button type='button' onClick={handleGoogleClick} className="bg-red-700 text-white p-2 rounded-l uppercase hover:opacity-80">Continue with google</button>
  )
}
