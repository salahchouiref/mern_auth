import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to="/">
            <h1 className='font-bold'>AuthApp</h1>
        </Link>
        <ul className='flex gap-3'>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/about"}>About</Link></li>
            <li><Link to={"/sign-in"}>Sign in</Link></li>
        </ul>
        </div>
    </div>
  )
}
