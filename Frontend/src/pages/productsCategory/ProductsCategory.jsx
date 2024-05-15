import style from './ProductsCategory.module.css'
import { useSelector } from 'react-redux'
import CardProduct from '../../components/cardProduct/CardProduct'
import { Link, useParams } from 'react-router-dom'
const ProductsCategory = () => {
    const {category} = useParams()

    const {products} = useSelector((state) => state.product)

    const filteredByCategory = products?.filter(item => item.category === category)
    
    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    }

  return (
    <div className={style.productsContainer}>
        <h1>{category}</h1>
      <div className={style.productsDiv}>
        {filteredByCategory?.map((item) => (
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
      <section className={style.sectionCallToAction}>
          <Link to={'/products'}><button onClick={scrollToTop}>Ver todos los productos</button></Link>
      </section>
    </div>
  );
}

export default ProductsCategory