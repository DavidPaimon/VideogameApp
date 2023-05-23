import {React, useState} from 'react';
import SearchBar from '../SearchBar/SearchBar'
import style from './Nav.module.css';
import { Link } from 'react-router-dom';

const Nav = ({ onSearch, logout }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <nav className={style.nav}>
        <div className={style.btns}>
          <button className={style.dropdownBtn} onClick={() => setIsOpen(!isOpen)}>☰</button>
        </div>
        <div className={`${style.dropdownContent} ${isOpen ? style.show : ''}`}>
          <Link to='/home'> HOME </Link>
          <Link to='/create'> CREATE </Link>
          <Link to='/about'> ABOUT </Link>
        </div>
        <SearchBar onSearch={onSearch} />
        <Link to='/'>
         <button className={style.btnLeave}>LOG OUT</button>
        </Link>
      </nav>
    )
  }
  
  export default Nav;
  