import style from './NavBar.module.css';
import logo from '../../../public/iBuy-Apple-White.svg'
import React, { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';

const NavBar = ({ loading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = async () => {
    setIsOpen(!isOpen);
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav className={style.navbar}>
      <div className={style.navbarContainer}>
        <div className={style.navbarLogo}>
          <Link to="/"><img className={style.navLogo} src={logo} alt="logo" /></Link>
        </div>
        <div className={`${style.navbarLinks} ${isOpen ? style.active : ""}`}>
          <Link to="/" onClick={toggleNavbar}>Home</Link>
          <Link to="/products" onClick={toggleNavbar}>Products</Link>
          {
            !user ? (
              <>
                <Link to="/register" onClick={toggleNavbar}>Register</Link>
                <Link to="/login" onClick={toggleNavbar}>Login</Link>
              </>
            ) : (
              <>
                {user?.role === 'admin' 
                ? <Link to="/backoffice" onClick={toggleNavbar}>Admin</Link> 
                : (
                <>
                <Link to="/account" onClick={toggleNavbar}>Account</Link>
                <Link to="/contact" onClick={toggleNavbar}>Contact</Link>
                </>)
                }
                <Link to="/" onClick={handleLogOut}>Logout</Link>
              </>
            )
          }
        </div>
        <div className={style.navbarToggle} onClick={toggleNavbar}>
          <span className={style.icon}>
            <RxHamburgerMenu />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;