import {Link} from "react-router-dom";

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" className="bg-violet-50 p-3 rounded-lg " placeholder="username" id='username' />
        <input type="email" className="bg-violet-50 p-3 rounded-lg " placeholder="email" id='email' />
        <input type="password" className="bg-violet-50 p-3 rounded-lg " placeholder="password" id='password' />
        <button className="bg-violet-900 text-white p-2 rounded-l uppercase hover:opacity-80">Sign up</button>
        {/* <button className="bg-red-700 text-white p-2 rounded-l uppercase hover:opacity-80">Sign up with google</button> */}
      </form>
      <div className="flex gap-2 mt-2">
        <p>Have an account</p>
        <Link to="/sign-in">
          <span className='text-blue-600'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
