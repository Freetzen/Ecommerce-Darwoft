import style from './FeaturedProducts.module.css'
import CardProduct from '../cardProduct/CardProduct'
import { useSelector } from 'react-redux'

const FeaturedProducts = () => {
    const {products} = useSelector((state) => state.product)
    const filteredProducts = products?.filter(objeto => objeto.featured === true).sort(() => Math.random() - 0.5).slice(0, 4);
  return (
    <div className={style.featuredContainer}>
        {
            filteredProducts?.map((item) =>(
                <CardProduct
                key={item._id}
                id={item._id}
                title={item.title}
                brand={item.brand}
                description={item.title}
                image={item.image}
                price={item.price}
                />
            ))
        }
    </div>
  )
}

export default FeaturedProducts