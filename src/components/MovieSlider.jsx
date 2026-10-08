/* eslint-disable react/prop-types */
import '../styles/components/movieSlider.scss'

import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoArrowForward, IoArrowBack, IoHeart } from 'react-icons/io5';

const MovieSlider = ({ movies, onAddToFavorites }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }}
        onClick={onClick}
      >
        <IoArrowForward style={{ color: 'white', padding: '10px' }} />
      </div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }}
        onClick={onClick}
      >
        <IoArrowBack style={{ color: 'white', padding: '10px' }} />
      </div>
    );
  }

  const shuffleArray = (array) => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const shuffledMovies = shuffleArray(movies);

  return (
    <div className="movie-slider" style={{ width: '95%', margin:'auto' }}>
      <Slider {...settings} className='movie-slider'>
        {shuffledMovies.map((movie) => (
          movie.Poster !== 'N/A' && (
            <div key={movie.imdbID} className="slide">
              <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} />
                <div className="movie-info">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                </div>
              </Link>
              <button onClick={() => onAddToFavorites(movie)}>
                <IoHeart /> Add to Favorites
              </button>
            </div>
          )
        ))}
      </Slider>
    </div>
  );
};

export default MovieSlider;
