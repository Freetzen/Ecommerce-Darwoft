import { Link } from 'react-router-dom'
import style from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={style.prueba} >
        <div className={style.loginContainer}>
            <h2>404 NOT FOUND...</h2>
            <Link to={'/'}><button>Home</button></Link>
        </div>
    </div>
  )
}

export default NotFound