import style from './Categories.module.css'
import { Link } from "react-router-dom";
import appleWatch from '../../../public/images/appleWatch.jpg'
import ipad from '../../../public/images/iPad.jpg'
import iphone from '../../../public/images/iphone.jpg'
import mac from '../../../public/images/mac.jpg'

const Categories = ({setCategoryFilter}) => {


  return (
    <div className={style.categoryContainer}>
        <div className={style.cardCategory}>
          <Link to={"/products"} onClick={()=>{setCategoryFilter('Apple Watch')}}>
            <h2>Apple Watch</h2>
            <img className={style.imageCategory}  src={appleWatch} alt="" />
          </Link>
        </div>
        <div className={style.cardCategory}>
          <Link to={"/products"} onClick={()=>{setCategoryFilter('iPad')}}>
          <h2>iPad</h2>
          <img className={style.imageCategory}  src={ipad} alt="" />
          </Link>
        </div>
        <div className={style.cardCategory}>
          <Link to={"/products"} onClick={()=>{setCategoryFilter('iPhone')}}>
          <h2>iPhone</h2>
          <img className={style.imageCategory}  src={iphone} alt="" />
          </Link>
        </div>
        <div className={style.cardCategory}>
          <Link to={"/products"} onClick={()=>{setCategoryFilter('Macbook')}}>
          <h2>MacBook</h2>
          <img className={style.imageCategory}  src={mac} alt="" />
          </Link>
        </div>
      </div>
  )
}

export default Categories