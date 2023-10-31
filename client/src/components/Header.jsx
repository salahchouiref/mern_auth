import { Link } from "react-router-dom"
import { useSelector } from "react-redux";

export default function Header() {
  const {user}  = useSelector(state=>state.user);
  return (
    <div className='bg-violet-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to="/">
            <h1 className='font-bold'>AuthApp</h1>
        </Link>
        <ul className='flex gap-3'>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/about"}>About</Link></li>
            <li>
            {
              user.currentUser!==null ? 
              (<Link to={"/profile"}>
                <img src={user.currentUser!==null && user.currentUser.profilePicture } 
              alt="profile"
              className="w-7 h-7 rounded-full" />
              </Link>) 
              : (<Link to={"/sign-in"}>SignIn</Link>) 
            }
            </li>
        </ul>
        </div>
    </div>
  )
}
