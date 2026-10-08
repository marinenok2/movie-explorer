import '../styles/components/movieDetail.scss'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieService from '../services/MovieService';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchMovie = async () => {
    try {
      const data = await MovieService.getMovieDetails(id);
      console.log('Movie data:', data);
      setMovie(data);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  fetchMovie();
}, [id]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div className="movie-detail">
      <div className="film-info">
        <div className="film-info-img">
          <img src={movie.Poster} alt={movie.Title} />
        </div>
        <div className="film-info-text">
          <p>Title: <span>{movie.Title}</span></p>
          <p>Released: <span>{movie.Released}</span></p>
          <p>Genre: <span>{movie.Genre}</span></p>
          <p>Country: <span>{movie.Country}</span></p>
          <p>Director: <span>{movie.Director}</span></p>
          <p>Writer: <span>{movie.Writer}</span></p>
          <p>Actors: <span>{movie.Actors}</span></p>
          <p>Awards: <span>{movie.Awards}</span></p>
        </div>
      </div>
      <button onClick={() => navigate('/')}>Go to search</button>
    </div>
  );
};

export default MovieDetail;
