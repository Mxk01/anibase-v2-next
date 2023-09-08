'use client'
import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';

function Page() {
  const [animeData, setAnimeData] = useState(null); // State to store anime data

  useEffect(() => {
    // Define the fetch function and call it inside useEffect
    const getAnime = () => {
      const requestOptions = {
        method: 'GET',
      };

      fetch('/api/favorites/animes', requestOptions)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('GET anime request failed');
          }
        })
        .then(data => {
          // Set the animeData state with the fetched data
          setAnimeData(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    // Call the fetch function when the component mounts
    getAnime();
  }, []); // Empty dependency array means this effect runs once, like componentDidMount

  return (
    <div>
      <Nav />
      {animeData ? (
        // Render the animeData if it's available
        <div>
          <h1>Anime Data</h1>
          <pre>{JSON.stringify(animeData, null, 2)}</pre>
        </div>
      ) : (
        // Render a loading message or some other UI while fetching
        <p>Loading anime data...</p>
      )}
    </div>
  );
}

export default Page;
