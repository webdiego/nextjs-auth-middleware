import React from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function Home() {
  const [photo, setPhoto] = React.useState();

  let day = new Date().getUTCDate();
  let month = new Date().getUTCMonth() + 1;

  React.useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/collections?page=${month}&per_page=100&query=abstract-3d&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`
      )
      .then((res) => {
        setPhoto(res.data.results[day].preview_photos[0].urls.raw);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="text-white w-full flex items-center justify-center min-h-screen space-x-5">
      <div className="w-1/2">
        <Image
          src={photo}
          alt="home"
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="cover"
          loading="lazy"
        />
      </div>
      <h1 className="text-center w-1/2">Abstract 3D photo of the day</h1>
    </div>
  );
}
