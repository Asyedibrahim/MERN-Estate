import { useSelector } from "react-redux"
import { FaSignOutAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutFailure, signInStart, signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';


export default function Profile() {

  const {currentUser, loading, error} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [ updateSuccess, setUpdateSuccess ] = useState(false);
  

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect( () => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        toast.error("Error uploading image (image must be less than 2mb)");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ( (downloadURL) => setFormData({...formData, avatar: downloadURL }) );
          toast.success("Image Uploaded Successfully!");
      },
    );

  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true);
      toast.success("User Updated Successfully!");

    } catch (error) {
      dispatch(updateUserFailure(error.message))
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message);
        return; 
      }
      dispatch(deleteUserSuccess(data));
      toast.success("Account deleted successfully!");

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error.message);
    }
  };

  const handleSignout = async () => {
    try{
      dispatch(signInStart());
      const res = await fetch('api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(signOutSuccess(data));
      toast.success("Signed out successfully!");

    } catch (error) {
      dispatch(signOutFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div className='mt-5 p-9 max-w-lg mx-auto border-0 sm:border-2 sm:shadow-lg rounded-lg'>

      <h1 className='text-3xl text-center font-bold mb-7 '>Profile</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input 
          onChange={(e) => setFile(e.target.files[0])}
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*"/>
        <img 
          src={formData.avatar || currentUser.avatar} 
          alt="Profile" className="rounded-full w-24 h-24 object-cover self-center mt-2" 
          onClick={()=>fileRef.current.click()} />

        <p className="text-sm text-center">
          {fileUploadError ? (
            ''
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              ''
            ) : (
              ''
            )
          }
        </p>

        <input type="text" placeholder="Username" className='border-2 p-3 rounded-lg' id="username" defaultValue={currentUser.username} onChange={handleChange}/>
        <input type="email" placeholder='Email' className='border-2 p-3 rounded-lg' id="email" defaultValue={currentUser.email} onChange={handleChange} />
        <input type="password" placeholder='Password' className='border-2 p-3 rounded-lg' id="password" onChange={handleChange} />

        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 font-semibold">{loading ? 'Loading...' : 'Update'}</button>
      </form>

      <div className="flex justify-between mt-5 font-semibold">
        <span className="text-red-700 cursor-pointer flex items-center" onClick={handleDelete}><MdDelete />&nbsp;Delete Account</span>
        <span className="text-red-700 cursor-pointer flex items-center" onClick={handleSignout}><FaSignOutAlt />&nbsp;Sign Out</span>
      </div>
      
    </div>
  )
}
