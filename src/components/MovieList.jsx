/* eslint-disable react/prop-types */
import '../styles/components/movieList.scss'
import { Link } from 'react-router-dom';
import { IoHeart } from 'react-icons/io5';

function MovieList({ movies, onAddToFavorites }) {

  return (
    <div className='movie-list'>
      {movies.map(movie => (
        <div key={movie.imdbID} className='movie'>
          <Link to={`/movie/${movie.imdbID}`}>
            <img src={movie.Poster} alt={movie.Title} />
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p> 
          </Link>
          <button onClick={() => onAddToFavorites(movie)}>
            <IoHeart /> Add to Favorites
          </button>
        </div>
      ))}
    </div>
  );
}

export default MovieList;



