import style from './CardProduct.module.css'
import { Link } from 'react-router-dom'
import { FaBagShopping } from "react-icons/fa6";

const CardProduct = ({id, title, image, price}) => {

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  
  return (
    <div className={style.container} key={id}>
        <div className={style.CardProductContainer}>
            <div className={style.containerImg}>
            <img src={image} alt={title} />
            </div>
            <h4>{title}</h4>
            <p>${price}</p>
            <Link className={style.cartLogo} onClick={scrollToTop} to={`/products/${id}`}>
                <FaBagShopping/>
            </Link>
        </div>
    </div>
  )
}

export default CardProduct