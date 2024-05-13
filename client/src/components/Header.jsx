import {FaSearch} from 'react-icons/fa';
import { FaHome } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Header() {
  const {currentUser} = useSelector(state => state.user);

  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

          <Link to="/" >
            <h1 className='font-bold text-md sm:text-xl flex flex-wrap'>
                <span className='text-green-500'>Zoro</span>
                <span className='text-slate-700'>Estate</span>
            </h1>
          </Link>
          
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input 
                  type="text" 
                  placeholder='Search...' className='bg-transparent focus:outline-none w-28 sm:w-64'
                />
                <FaSearch className="text-slate-600" />
            </form>

            <ul className='flex gap-7'>
              <Link to="/" className='flex items-center gap-1'>
                <FaHome className='hidden sm:inline text-slate-700'/>
                <li className='hidden sm:inline text-slate-700 hover:underline font-bold'>Home</li>
              </Link>
              <Link to="about" className='flex items-center gap-1'>
                <MdMessage  className='hidden sm:inline text-slate-700'/>
                <li className='hidden sm:inline text-slate-700 hover:underline font-bold'>About</li>
              </Link>
              <Link to="/profile" className='flex items-center gap-1'>
                {currentUser ? (
                    <img src={currentUser.avatar} alt="profile" className='rounded-full h-7 w-7 object-cover'/>
                 ) : (
                  <>
                    <FaSignInAlt  className='text-slate-700'/>
                    <li className='text-slate-700 hover:underline font-bold'>Sign In</li>
                  </>
                 )}
              </Link>
            </ul>

        </div>
    </header>
  )
}
