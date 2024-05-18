import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa';

export default function Listing() {

    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);


    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listId}`);
                const data = await res.json();
                if (data.success === false) {
                    setLoading(false);
                    setError(true);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
                
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }
        fetchListing();
    }, [params.listId] );


return (
    <main>
        {loading && (
            <div className='flex justify-center mt-60 font-bold text-3xl'>Loading <ReactLoading type="bubbles" color="#000" height={100} width={50} /></div>
        )}
        {error && (
            <p className='text-center font-bold mt-60 text-2xl'>Something went wrong!</p>
        )}

{listing && !loading && !error && (
        <div>
          
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <img src={url} alt="Estate Photos" className='h-[300px] md:h-[550px] sm:h-[450px] w-full'/>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare 
              className='text-slate-500' 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}/>
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>Link Copied!</p>
          )}

          <div className='flex flex-col max-w-4xl mx-auto p-3 my-6 gap-4'>
              <p className='text-2xl font-semibold'>{listing.name}</p>
            <div className='text-2xl font-semibold flex items-center'>
              Price:
              {listing.offer ? 
              <div className='flex items-center'>
                <p className='text-red-600 line-through text-[20px] ml-2'>₹ {listing.regularPrice.toLocaleString('en-US')}&nbsp;</p>
                <p>&nbsp;₹ {listing.discountPrice.toLocaleString('en-US')} / month</p> 
              </div> 
              : <p>&nbsp;₹ {listing.regularPrice.toLocaleString('en-US')} / month</p>}
            </div>

            <p className='flex items-center mt-6 gap-6 text-slate-600 my-2'>
              <FaMapMarkerAlt className='text-green-700'/>
              {listing.address}
            </p>

            <div className='flex gap-4'>
              <p className='bg-red-800 w-full max-w-[200px] text-white text-center font-semibold rounded-md p-2'>{listing.type === 'rent' ? 'For Rent' : 'For Sale'}</p>

              {listing.offer && (
                <p className='bg-green-800 w-full max-w-[200px] p-2 text-white rounded-md font-semibold text-center'>₹ {listing.regularPrice - listing.discountPrice}&nbsp;Discount</p>
              )}
            </div>

              <p className='text-slate-800'><span className='font-semibold text-black'>Description - </span>{listing.description}</p>

              <ul className='text-green-900 font-semibold text-sm flex items-center gap-4 sm:gap-6 flex-wrap'>
                <li className='flex items-center gap-1 whitespace-nowrap'><FaBed className='text-lg'/>{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}</li>
                <li className='flex items-center gap-1 whitespace-nowrap'><FaBath className='text-lg'/>{listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}</li>
                <li className='flex items-center gap-1 whitespace-nowrap'><FaParking className='text-lg'/>{listing.parking ? 'Parking spot' : 'No Parking'}</li>
                <li className='flex items-center gap-1 whitespace-nowrap'><FaChair className='text-lg'/>{listing.furnished ? 'Furnished' : 'Not Furnished'}</li>
              </ul>
          </div>

        </div>
        )}
    </main>
  );
};
