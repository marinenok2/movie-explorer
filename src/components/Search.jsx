 /* eslint-disable react/prop-types */
import { useState } from 'react';

function Search({ onSearch, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className='search'>
      <div className='search-info'>
        <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search movies, series, cartoons..."
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <select onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="movies">Movies</option>
        <option value="series">Series</option>
        <option value="cartoons">Cartoons</option>
      </select>
    </div>
  );
}

export default Search;

