import style from './Categories.module.css'
import { Link } from "react-router-dom";
import appleWatch from '../../../public/images/appleWatch.jpg'
import ipad from '../../../public/images/iPad.jpg'
import iphone from '../../../public/images/iphone.jpg'
import mac from '../../../public/images/mac.jpg'

const Categories = ({setCategoryFilter}) => {

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
}

  return (
    <div className={style.categoryContainer}>
        <div className={style.cardCategory}>
          <Link to={"/products/category/Apple Watch"} onClick={scrollToTop}>
            <h2>Apple Watch</h2>
            <img className={style.imageCategory}  src={appleWatch} alt="" />
          </Link>
        </div>
        <div className={style.cardCategory}>
          <Link to={"/products/category/iPad"} onClick={scrollToTop}>
          <h2>iPad</h2>
          <img className={style.imageCategory}  src={ipad} alt="" />
          </Link>
        </div>
        <div className={style.cardCategory}>
          <Link to={"/products/category/iPhone"} onClick={scrollToTop}>
          <h2>iPhone</h2>
          <img className={style.imageCategory}  src={iphone} alt="" />
          </Link>
        </div>
        <div className={style.cardCategory}>
          <Link to={"/products/category/Macbook"} onClick={scrollToTop}>
          <h2>MacBook</h2>
          <img className={style.imageCategory}  src={mac} alt="" />
          </Link>
        </div>
      </div>
  )
}

export default Categories