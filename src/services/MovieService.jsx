
import axios from 'axios';

const API_URL = 'http://www.omdbapi.com/';
const API_KEY = 'cefde68d'; 

const MovieService = {
  async getMovies(page = 1) {
    try {
      const response = await axios.get(`${API_URL}?s=all&page=${page}&apikey=${API_KEY}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching movies:', error);
      return { error: 'Failed to get movies. Please try again later.' };
    }
  },

  async searchMovies(query, page = 1) {
    try {
      const response = await axios.get(`${API_URL}?s=${query}&page=${page}&apikey=${API_KEY}`);
      return response.data; 
    } catch (error) {
      console.error('Error searching for movies:', error);
      return { error: 'Failed to search for movies. Please try again later.' };
    }
  },

  async getMovieDetails(id) {
    try {
      const response = await axios.get(`${API_URL}?i=${id}&apikey=${API_KEY}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return { error: 'Failed to get movie details. Please try again later.' };
    }
  }
};

export default MovieService;



