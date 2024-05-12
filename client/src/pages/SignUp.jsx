import React from 'react'
import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-bold my-7 '>Sign Up</h1>
      
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='Enter Username' className='border p-3 rounded-lg' id="username"/>
        <input type="email" placeholder='Enter Your Email' className='border p-3 rounded-lg' id="email"/>
        <input type="password" placeholder='Enter Password' className='border p-3 rounded-lg' id="password"/>
        <button className='bg-slate-700 p-3 text-white rounded-lg uppercase font-semibold hover:opacity-95 disabled:opacity-85'>Sign Up</button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Already Have an Account?</p>
        <Link to="/sign-in">
          <span className='text-blue-700 font-semibold hover:underline'>Sign In</span>
        </Link>
      </div>

    </div>
  )
}
