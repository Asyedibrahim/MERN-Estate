import { useSelector } from "react-redux"

export default function Profile() {

  const {currentUser} = useSelector(state => state.user);

  return (
    <div className='mt-5 p-9 max-w-lg mx-auto border-0 sm:border-2 sm:shadow-lg rounded-lg'>

      <h1 className='text-3xl text-center font-bold mb-7 '>Profile</h1>

      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="Profile" className="rounded-full w-24 h-24 object-cover self-center mt-2"/>
        <input type="text" placeholder="Username" className='border-2 p-3 rounded-lg' id="username" />
        <input type="email" placeholder='Email' className='border-2 p-3 rounded-lg' id="email" />
        <input type="password" placeholder='Password' className='border-2 p-3 rounded-lg' id="password" />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 font-semibold">Update</button>

      </form>

      <div className="flex justify-between mt-5 font-semibold">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      
      
    </div>
  )
}
