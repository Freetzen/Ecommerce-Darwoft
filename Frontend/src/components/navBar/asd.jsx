import style from "./NavBar.module.css";
import logo from '../../../public/iBuy-Apple-White.svg'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import Loader from "../loader/Loader";

const NavBar = ({loading}) => {
    const [isOpen, setIsOpen] = useState(false)
/*     const [loading, setLoading] = useState(false) */

    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleSelect = async () => {
        setIsOpen(!isOpen)
    }

    const handleLogOut = async () => {
        setIsOpen(!isOpen)
        await dispatch(logout())
        navigate('/')
    }

  return (
    <div className={style.navBarContainer}>

        <Link to="/" className={style.Link}>
            <img className={style.navLogo} src={logo} alt="logo" />
        </Link>
        <div>
        {user?.role === 'admin' 
        ? <Link className={style.LinkAdmin} to={'/backoffice'}>ADMIN</Link> 
        : null}
        </div>
        <div>
            {
                loading ?
                <Loader/>
                : !user ? (
                <div className={`${style.navItems } ${isOpen ? style.open : ''}`}>
                    <Link className={style.Link} to={'/products'} onClick={handleSelect}>Productos</Link>
                    <Link className={style.Link} to={'/login'} onClick={handleSelect}>Inicio</Link>
                    <Link className={style.Link} to={'/register'} onClick={handleSelect}>Registrar</Link>
                </div>
                ):
                ( 
                    <div className={`${style.navItems} ${isOpen ? style.open : ''}`}>
                        <Link className={style.Link} to={'/products'} onClick={handleSelect}>Productos</Link>
                        <Link className={style.Link} to={'/account'} onClick={handleSelect}>Perfil</Link>
                        <Link className={style.Link} to={'/'} onClick={handleLogOut}>Cerrar Sesión</Link>
                    </div>
                )
            }
          
        </div>

        <div className={`${style.navToggle} ${isOpen ? style.open : ''}`} onClick={handleSelect}>
            <div className={style.bar}></div>
        </div>
    </div>
  )
}

export default NavBar