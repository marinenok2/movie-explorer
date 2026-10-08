
import '../styles/components/menu.scss';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoSunny, IoMoon } from 'react-icons/io5';
import { TiThMenu } from 'react-icons/ti';

const Menu = () => {
  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log('Mobile Menu Open:', !isMobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <div className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link className={`link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
        <Link className={`link ${isActive('/allMovies') ? 'active' : ''}`} to="/allMovies">All Movies</Link>
        <Link className={`link ${isActive('/favorites') ? 'active' : ''}`} to="/favorites">Favorites</Link>
        <Link className={`link ${isActive('/login') ? 'active' : ''}`} to="/login">Login</Link>
        <Link className={`link ${isActive('/register') ? 'active' : ''}`} to="/register">Register</Link>
      </div>
      
      <button className='theme-toggle' onClick={toggleTheme}>
        {theme === 'light' ? <IoMoon size={24} /> : <IoSunny size={24} />}
      </button>

      <button className='menu-toggle' onClick={toggleMobileMenu}>
        <TiThMenu size={30} />
      </button>
    </nav>
  );
};

export default Menu;

