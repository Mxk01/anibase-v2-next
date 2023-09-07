import Image from 'next/image'
import { useState } from 'react';
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import useSWR from 'swr'
 function AnimeComponent() {
    const fetcher = (url:string) => fetch(url).then(res => res.json());
    let [clicked,setClicked] = useState(false);
    let [url,setUrl] = useState("https://kitsu.io/api/edge/anime")
    const { data, error, isLoading } = useSWR(
      url,
      fetcher
    );
    

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
     
        {
            !isLoading ? 
      data.data.map(anime => {
        console.log(anime)
        return <div key={anime.id} className='p-4 flex justify-center items-center flex-col'>
            <h1 className='text-xl font-bold text-center mb-2 -ml-8	'>{anime.attributes.canonicalTitle}</h1>  
            <p className="text-xl bg-purple">Rating rank : {anime.attributes.ratingRank}</p>    
        <Image src={anime.attributes.posterImage.original} width={250} height={250} loading="lazy" alt=""></Image>
        {clicked ?  <AiFillHeart className="self-center mt-2 cursor-pointer" onClick={()=>{setClicked(!clicked)}}/> : 
        <AiOutlineHeart   className="self-center mt-2 cursor-pointer"  onClick={()=>{setClicked(!clicked)}}/> }
              </div>
      }) : <h1>Content is loading...</h1>  } 
      </div>
      </div>
  )
}

export default AnimeComponent