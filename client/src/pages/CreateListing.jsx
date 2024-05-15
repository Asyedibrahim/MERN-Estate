import { MdSell, MdOutlineBathroom } from "react-icons/md";
import { BsHouseCheck } from "react-icons/bs";
import { FaParking, FaPaintRoller, FaImages } from "react-icons/fa";
import { BiSolidOffer, BiSolidBadgeDollar } from "react-icons/bi";
import { IoIosBed } from "react-icons/io";
import { RiDiscountPercentFill } from "react-icons/ri";

export default function CreateListing() {
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
            <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase disabled:opacity-80 upload font-semibold hover:shadow-lg'>Upload</button>
          </div>

          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 font-semibold'>create listing</button>
        </div>

      </form>
    </main>
  )
}
