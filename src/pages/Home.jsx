import React, { useEffect } from 'react';
import Categories from '../components/Category';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import Announcement from '../components/Announcement';
import SearchBar from '../components/searchBar';
import Title from '../components/Title';

const Home = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Announcement />
        <Slider />
        <Title text={'Collections'} />
        <Categories />
        <Title text={'Products'} />
        <SearchBar />
        <Products />
        <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
