'use client'
import { Irish_Grover } from 'next/font/google';
import Image from 'next/image';
import { useState, useEffect, memo } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useSWR from 'swr';

function AnimeComponent({ category,userData }) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  let url = 'https://kitsu.io/api/edge/anime';
  const [selectedItems, setSelectedItems] = useState({});
  const [page, setPage] = useState(1); // Current page number
  const itemsPerPage = 3; // Number of items per page
   url = `${url}?page[limit]=${itemsPerPage}&page[offset]=${(page - 1) * itemsPerPage}`;
   url = category ? `${url}&filter[categories]=${category}` : url;
  const { data, error, isLoading } = useSWR(
    `${url}`,
    fetcher
  );
  const handleItemClick = (animeId) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [animeId]: !prevSelectedItems[animeId],
    }));
  };

  const addItemToFavorite = (item) => {
    
        const requestOptions = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                 body: JSON.stringify({title:item.attributes.canonicalTitle,ranking:item.attributes.ratingRank,image:item.attributes.posterImage.original,addedBy:userData})
                };
              fetch('/api/favorites/like', requestOptions).then(response => {
                  if (response.ok) { return(response.json()) } 
                  else { throw new Error('POST request failed');
    }
  }).then(data => {
    console.log('Response data:', data);
  }).catch(error => {
    console.error('Error:', error);
  });
  }
  const removeItemFromFavorite = (item) => {
    
  }
  // Function to handle page changes
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1); // Reset to the first page when the category changes
  }, [category]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!isLoading ? (
          data.data.map((anime) => {
            const isSelected = selectedItems[anime.id] || false;

            return (
              <div key={anime.id} className="relative p-4 snap-always">
                <div className="relative">
                  <Image
                    src={anime.attributes.posterImage.original}
                    width={250}
                    height={250}
                    loading="lazy"
                    alt=""
                  ></Image>
                  <div
                    className={`absolute inset-0 flex items-center flex-col cursor-default justify-center opacity-0 hover:opacity-100 transition-opacity ${
                      isSelected ? 'bg-black bg-opacity-30' : ''
                    }`}
                  >
                    <h1 className="text-2xl font-bold text-center mb-2 select-all text-white">
                      {anime.attributes.canonicalTitle}
                    </h1>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 mb-4 rounded dark:bg-blue-900 dark:text-blue-300">
                      Rating rank: {anime.attributes.ratingRank}
                    </span>
                  </div>
                </div>
                {isSelected ? (
                  <AiFillHeart
                    className="self-center mt-2 cursor-pointer"
                    onClick={() => {
                      handleItemClick(anime.id);
                      removeItemFromFavorite(anime)
                    }}
                  />
                ) : (
                  <AiOutlineHeart
                    className="self-center mt-2 cursor-pointer"
                    onClick={() => {
                      handleItemClick(anime.id);
                      addItemToFavorite(anime)
                    }}
                  />
                )}
              </div>
            );
          })
        ) : (
          <h1>Content is loading...</h1>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        {data ? (
          <button
            className="px-6 py-2 text-purple-100 rounded bg-gradient-to-r from-purple-600 to-purple-400"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
        ) : null}

        {data && data.meta && data.meta.count > page * itemsPerPage ? (
          <button
            className="px-6 py-2 text-purple-100 rounded bg-gradient-to-r from-purple-600 to-purple-400 ml-2"
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default memo(AnimeComponent);
