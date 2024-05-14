import style from './NotFound.module.css'
import notFound from '../../../public/images/404NotFound.png'

const NotFound = () => {
  return (
    <div className={style.notFoundContainer}>
        <div>
            404 NOT FOUND
        </div>
    </div>
  )
}

export default NotFound