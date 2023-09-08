"use client"
import useSWR,{mutate} from 'swr';
import {useState} from 'react'
import { useSession } from 'next-auth/react';
import Nav from '../components/Nav';
import Image from 'next/image';

function Page() {
  const { data, status } = useSession();
  const userEmail = status=="authenticated" && data.user.email;
   let [page,setPage] = useState(1);
  const { data: animeData, error } = useSWR(`/api/favorites/animes/${userEmail}?page=${page}`, async (url) => {
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      throw new Error('GET anime request failed');
    }
    mutate('/api/favorites/animes/[email]')
    return response.json();
    
  });

  return (
    <div>
      <Nav></Nav>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 lg:grid-cols-3 gap-4 p-4">
        {error ? (
          <p>Error loading anime data...</p>
        ) : !animeData ? (
          <p>Loading anime data...</p>
        ) : (
          animeData.myAnime.map(anime => (
            <div className="rounded-lg p-2 shadow-md" key={anime.id}>
              <h2 className="text-lg font-semibold mb-2">{anime.title}</h2>
              <p>Ranking: {anime.ranking || 'N/A'}</p>
              <Image src={anime.image} width={300} height={300} alt={anime.title} className="mt-2 rounded" />
            </div>
          ))
        )}
      </div>
      { animeData &&
      <div className='flex justify-evenly'>  
      <button className='bg-red-500 p-4'>Previous</button>
      <button className='bg-red-500 p-4'>Next</button>
      </div>
      }
    </div>
  );
}

export default Page;
