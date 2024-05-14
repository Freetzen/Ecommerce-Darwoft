// Footer.jsx
import style from './Footer.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logoiBuy from '../../../public/iBuy-Apple-White.svg';
import { useDispatch, useSelector } from 'react-redux';
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { logout } from '../../redux/authSlice';

const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        <div className={style.footerLeft}>
          <div className={style.footerLogo}>
            <Link to="/"><img className={style.footerLogoImg} src={logoiBuy} alt="Logo" /></Link>
          </div>
        </div>
        <div className={style.footerMiddle}>
          <div className={style.footerLinks}>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact</Link>
            {!user ? (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            ) : (
              <>
                {user?.role === 'admin' ? <Link to="/backoffice">Admin</Link> : <Link to="/account">Account</Link>}
                <Link to="/" onClick={handleLogOut}>Logout</Link>
              </>
            )}
          </div>
        </div>
        <div className={style.footerRight}>
          <div className={style.footerSocial}>
            <FaInstagram className={style.footerSocialSvg}/>
            <CiFacebook className={style.footerSocialSvg}/>
            <FaYoutube className={style.footerSocialSvg}/>
            <FaLinkedin className={style.footerSocialSvg}/>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
