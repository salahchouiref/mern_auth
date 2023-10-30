import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import { signInStart,signInFailure,signInSuccess } from "../redux/user/userSlice";
import { useDispatch,useSelector } from "react-redux";

export default function SignIn() {
  const [formdata,setFormData] = useState({});
  const navigate = useNavigate(); 
  const {error,loading} = useSelector((state)=>state.user);
  const dispatch = useDispatch(); 
  const handleChange = (e) =>{
    setFormData({...formdata,[e.target.id]:e.target.value});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin",{
        method : "POST",
        headers : {
          'Content-Type' : "application/json",
        },
        body : JSON.stringify(formdata),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    }catch(error){
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" className="bg-violet-50 p-3 rounded-lg " placeholder="email" id='email' onChange={handleChange}/>
        <input type="password" className="bg-violet-50 p-3 rounded-lg " placeholder="password" id='password' onChange={handleChange}/>
        <button disabled={loading?true:false} className="bg-violet-900 text-white p-2 rounded-l uppercase hover:opacity-80">
          {loading?"loading...":"Sign in"}
        </button>
        {/* <button className="bg-red-700 text-white p-2 rounded-l uppercase hover:opacity-80">Sign up with google</button> */}
      </form>
      <div className="flex gap-2 mt-2 ">
        <p>You don't have an account!</p>
        <Link to="/sign-up">
          <span className='text-blue-600'>Sign up</span>
        </Link>
      </div>
      <p className="text-red-600 mt-3 ">
      {
          error ? error.message || "something went wrong!" : ""
        }
      </p>
    </div>
  )
}
