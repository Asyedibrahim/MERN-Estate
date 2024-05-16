import { MdSell, MdOutlineBathroom } from "react-icons/md";
import { BsHouseCheck } from "react-icons/bs";
import { FaParking, FaPaintRoller, FaImages } from "react-icons/fa";
import { BiSolidOffer, BiSolidBadgeDollar } from "react-icons/bi";
import { IoIosBed } from "react-icons/io";
import { RiDiscountPercentFill } from "react-icons/ri";
import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import toast from "react-hot-toast";

export default function CreateListing() {

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [uploading, setUploading] = useState(false);
  
  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true)
      const promises = [];

      for (let i = 0; i < files.length; i++ ) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({ 
          ...formData, 
          imageUrls: formData.imageUrls.concat(urls) 
        });
        toast.success('Image Uploaded Successfully');
        setUploading(false);
        
      }).catch( (err) => {
        toast.error('Image upload failed (2mb max per image)');
        setUploading(false);
      });

    } else if (files.length == 0){
      toast.error('Atleast upload 1 image per listing');
    } else {
      toast.error('You can only upload 6 image per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise( (resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },

      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter( (_,i) => i !== index )
    })
  }
  

  return (
    <main className='p-2 max-w-5xl mx-auto'>
      <h1 className='text-3xl font-bold text-center mt-5 mb-6'>Create a Listing</h1>

      <form className='flex flex-col sm:flex-row gap-4'>

        <div className='flex flex-col gap-4 flex-1'>

          <input type="text" placeholder="Name" className='border-2 border-gray-300 p-3 rounded-lg' id="name" maxLength='62' minLength='10' required />
          <textarea type="text" placeholder="Description" className='border-2 border-gray-300 p-3 rounded-lg' id="description"  required />
          <input type="text" placeholder="Address" className='border-2 border-gray-300 p-3 rounded-lg' id="address" required />

          <div className='flex gap-6 flex-wrap mt-2'>
            <div className='flex gap-2'>
              <input type="checkbox" className='w-5' id="sale" />
              <span className="flex items-center">Sell&nbsp;<MdSell className="text-slate-700"/></span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" className='w-5' id="rent" />
              <span className="flex items-center">Rent&nbsp;<BsHouseCheck className="text-slate-700"/></span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" className='w-5' id="parking" />
              <span className="flex items-center">Parking Spot&nbsp;<FaParking className="text-slate-700"/></span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" className='w-5' id="furnished" />
              <span className="flex items-center">Furnished&nbsp;<FaPaintRoller className="text-slate-700"/></span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" className='w-5' id="offer" />
              <span className="flex items-center">Offer&nbsp;<BiSolidOffer className="text-slate-700"/></span>
            </div>
          </div>

          <div className='flex flex-wrap gap-8'>
            <div className='flex items-center gap-2'>
              <input type="number" id='bedrooms' min='1' max='10' required className='p-3 border-2 border-slate-300 rounded-lg'/>
              <p className="flex items-center">Beds&nbsp;<IoIosBed className="text-slate-700"/></p>
            </div>
            <div className='flex items-center gap-2'>
              <input type="number" id='bathrooms' min='1' max='10' required className='p-3 border-2 border-slate-300 rounded-lg'/>
              <p className="flex items-center">Bathrooms&nbsp;<MdOutlineBathroom className="text-slate-700"/></p>
            </div>
            <div className='flex items-center gap-2'>
              <input type="number" id='regularPrice' min='1' max='10' required className='p-3 border-2 border-slate-300 rounded-lg'/>
              <div className="flex flex-col items-center">
                <p className="flex items-center"><BiSolidBadgeDollar className="text-slate-700"/>&nbsp;Regular Price</p>
                <span className='text-xs'>($ / months)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input type="number" id='discountPrice' min='1' max='10' required className='p-3 border-2 border-gray-300 rounded-lg'/>
              <div className="flex flex-col items-center">
                <p className="flex items-center"><RiDiscountPercentFill className="text-slate-700"/>&nbsp;Discount Price</p>
                <span className='text-xs'>($ / months)</span>
              </div>
            </div>
          </div>

        </div>

        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold flex items-center'><FaImages className="text-slate-700"/>&nbsp;Images:
          <span className='font-normal text-gray-600 ml-2'>The first image will be the cover photo (max 6)</span></p>

          <div className='flex gap-4'>
            <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple onChange={(e)=>setFiles(e.target.files)}/>
            <button disabled={uploading} className='p-3 text-green-700 border border-green-700 rounded uppercase disabled:opacity-80 upload font-semibold hover:shadow-lg' onClick={handleImageSubmit}>{uploading ? 'Uploading...' : 'Upload'}</button>
          </div>
          {
            formData.imageUrls.length > 0 && formData.imageUrls.map( (url, index) => (
              <div key={url} className="flex justify-between p-3 border items-center">
                <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg"/>
                <span className="">Image {index + 1}</span>
                <button type="button" onClick={ ()=>handleRemoveImage(index) } className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
              </div>
            ))
          }

          <button type="button" className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 font-semibold'>create listing</button>
        </div>

      </form>
    </main>
  )
}
