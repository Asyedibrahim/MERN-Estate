import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {

    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


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
                <img src={url} alt="Estate Photos" className='h-550'/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        )}
    </main>
  );
};
