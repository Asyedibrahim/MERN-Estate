import { useSelector } from "react-redux"
import { FaSignOutAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";

export default function Profile() {

  const {currentUser} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  

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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ( (downloadURL) => setFormData({...formData, avatar: downloadURL }) );
      },
    );

  };

  return (
    <div className='mt-5 p-9 max-w-lg mx-auto border-0 sm:border-2 sm:shadow-lg rounded-lg'>

      <h1 className='text-3xl text-center font-bold mb-7 '>Profile</h1>

      <form className='flex flex-col gap-4'>
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
            <span className="text-red-700 font-semibold">Error image upload (image must be less than 2mb)</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">Image Uploaded Successfully!</span>
            ) : (
              ''
            )
          }
        </p>

        <input type="text" placeholder="Username" className='border-2 p-3 rounded-lg' id="username" />
        <input type="email" placeholder='Email' className='border-2 p-3 rounded-lg' id="email" />
        <input type="password" placeholder='Password' className='border-2 p-3 rounded-lg' id="password" />

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 font-semibold">Update</button>
      </form>

      <div className="flex justify-between mt-5 font-semibold">
        <span className="text-red-700 cursor-pointer flex items-center"><MdDelete />&nbsp;Delete Account</span>
        <span className="text-red-700 cursor-pointer flex items-center"><FaSignOutAlt />&nbsp;Sign Out</span>
      </div>
      
      
    </div>
  )
}
