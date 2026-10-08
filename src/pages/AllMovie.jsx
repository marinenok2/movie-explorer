import '../styles/pages/allMovie.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieService from '../services/MovieService';
import Pagination from '../components/Pagination';

const AllMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      const data = await MovieService.getMovies(page);
      setMovies(data.Search);
      setTotalResults(data.totalResults);
    } catch (err) {
      setError('Не вдалося завантажити дані');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const totalPages = Math.ceil(totalResults / 10);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movies) return <div>No movies found</div>;

  return (
    <>
      <div className="movie-list">
        <div className="movies">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} />
                <div className="movie-info">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default AllMovie;
