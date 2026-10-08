/* eslint-disable react/prop-types */
import '../styles/pages/favorites.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favorites = ({ onRemoveFromFavorites }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleRemoveFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    setFavorites(updatedFavorites);
    if (onRemoveFromFavorites) onRemoveFromFavorites(movie);
  };

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      <div className="movies">
        {favorites.length === 0 ? (
          <p>No favorites yet</p>
        ) : (
          favorites.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <Link to={`/movie/${movie.imdbID}`}>
                 <img src={movie.Poster} alt={movie.Title} />
                <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                </div>
              </Link>
             
                <button onClick={() => handleRemoveFromFavorites(movie)}>
                  Remove from Favorites
                </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;


