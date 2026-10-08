// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MovieDetail from './components/MovieDetail';
import Favorites from './pages/Favorites';
import Menu from './components/Menu';
import AllMovie from './pages/AllMovie';
import Footer from './pages/Footer';

function App() {
  return (
    <>
      <Router>
        <Menu/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/allMovies" element={<AllMovie/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer/>
    </Router>
    </>
    
  );
}

export default App;

