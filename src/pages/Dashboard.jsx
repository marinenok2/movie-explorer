import '../styles/pages/dashboard.scss';
import { useState, useEffect } from 'react';
import MovieService from '../services/MovieService';
import Search from '../components/Search';
import MovieList from '../components/MovieList';
import Favorites from './Favorites';
import MovieSlider from '../components/MovieSlider';
import Pagination from '../components/Pagination';

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    MovieService.getMovies(page)
      .then(response => {
        setAllMovies(response.Search || []);
      })
      .catch(error => {
        setError(error.message);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  useEffect(() => {
    if (query) {
      MovieService.searchMovies(query, page)
        .then(response => {
          setMovies(response.Search || []);
          setTotalResults(response.totalResults || 0);
        })
        .catch(error => {
          setError(error.message);
        });
    } else {
      MovieService.getMovies(page)
        .then(response => {
          setMovies(response.Search || []);
          setTotalResults(response.totalResults || 0);
        })
        .catch(error => {
          setError(error.message);
        });
    }
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1); 
  };

  const handleFilterChange = (filterCategory) => {
    setFilter(filterCategory);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAddToFavorites = (movie) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.some(fav => fav.imdbID === movie.imdbID)) {
        return prevFavorites;
      }
      const updatedFavorites = [...prevFavorites, movie];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const handleRemoveFromFavorites = (movie) => {
    setFavorites(prevFavorites => {
      const updatedFavorites = prevFavorites.filter(fav => fav.imdbID !== movie.imdbID);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const filteredMovies = movies.filter(movie => {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'movies' && movie.Type === 'movie') {
      return true;
    }
    if (filter === 'series' && movie.Type === 'series') {
      return true;
    }
    if (filter === 'cartoons' && movie.Type === 'cartoon') {
      return true;
    }
    return false;
  });

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className='dashboard'>
      <Search onSearch={handleSearch} onFilterChange={handleFilterChange} />
      {error && <div>Error: {error}</div>}
      <MovieSlider movies={allMovies} onAddToFavorites={handleAddToFavorites} />
      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          <>
            <MovieList movies={filteredMovies} onAddToFavorites={handleAddToFavorites} />
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div>No movies found</div>
        )}
      </div>
      <Favorites favorites={favorites} onRemoveFromFavorites={handleRemoveFromFavorites} />
    </div>
  );
};

export default Dashboard;





