import style from './Products.module.css'
import { useSelector } from 'react-redux'
import CardProduct from '../../components/cardProduct/CardProduct'
import Filters from '../../components/filters/Filters'

const Products = () => {

    const {products} = useSelector((state) => state.product)
  return (
    <div className={style.productsContainer}>
      <div className={style.filtersDiv}>
        <Filters/>
      </div>
      <div className={style.productsDiv}>
        {products?.map((item) => (
          <CardProduct
            key={item._id}
            id={item._id}
            title={item.title}
            brand={item.brand}
            description={item.title}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Products