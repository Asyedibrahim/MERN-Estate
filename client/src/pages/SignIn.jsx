import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json(); // Converting "res" to "json format" store in a variable "data"
      if(data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
        setLoading(false);
        setError(null);
        navigate('/');
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
  };

  return (
    <div className='mt-5 p-9 max-w-xl mx-auto border-0 sm:border-2 sm:shadow-lg rounded-lg signup'>

      <h1 className='text-3xl text-center font-bold mb-7 '>Sign In</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Username' className='border-2 p-3 rounded-lg' id="username"  onChange={handleChange}/>
        <input type="password" placeholder='Enter Password' className='border-2 p-3 rounded-lg' id="password" onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 p-3 text-white rounded-lg uppercase font-semibold hover:opacity-95 disabled:opacity-85'>
          {loading ? "Loading..." : "Sign In"}
          </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Didn't Have an Account?</p>
        <Link to="/sign-up">
          <span className='text-blue-700 font-semibold hover:underline'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}

    </div>
  )
}
