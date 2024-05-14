import style from './ProductDetail.module.css'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import RelatedProducts from '../../components/relatedProducts/RelatedProducts'
import Accordion from '../../components/accordion/Accordion'
import Swal from 'sweetalert2';


const ProductDetail = () => {
    const {id} = useParams()
    
    const [productDetail, setProductDetail] = useState('')
    const [addToCart, setAddToCart] = useState({
      id,
      quantity: 1
  })
    const {products} = useSelector((state) => state.product)
    
    const productFiltered = () => {
        const productSearch = products?.find((product)=> product._id === id)
        return productSearch
    }

    useEffect(() => {
        if(addToCart.quantity > productDetail?.stock)
          setAddToCart({
        ...addToCart,
        quantity: productDetail?.stock
      })
    }, [addToCart])

    useEffect(() => {
      setProductDetail(productFiltered())
  }, [products, id])
    
    const handleQuantityChange = (e) => {
      if(e.target.value > productDetail?.stock){
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Máximo ${productDetail?.stock} unidades`,
          showConfirmButton: false,
          timer: 1200,
        });
        setAddToCart({
          ...addToCart,
          quantity: 1
      });
      }
        const newQuantity = parseInt(e.target.value);
        setAddToCart({
            ...addToCart,
            quantity: newQuantity
        });
    };

    const agregarAlCarrito = (producto) => {
        const carrito = JSON.parse(localStorage.getItem('cart')) || [];
        const productoExistente = carrito.find(item => item.id === producto.id);
        if (productoExistente) {
            productoExistente.quantity = producto.quantity;
        } else {
            carrito.push(producto);
        }
        localStorage.setItem('cart', JSON.stringify(carrito));
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Producto agregado al carrito correctamente"
        });
    };

    const handleAddToCart = () => {
        agregarAlCarrito(addToCart)
        setAddToCart({
          ...addToCart,
          quantity: 1
      });

    }

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

  return (
    <>
      <div className={style.containerDetail}>
        <section className={style.sectionDetail}>
        <h1 className={style.h1Mobile}>{productDetail?.title}</h1>
          <div className={style.divImg}>
            <img src={productDetail?.image} alt="detail-product" />
          </div>

          <div className={style.containerInfoDetail}>
            <h1 className={style.h1Desktop}>{productDetail?.title}</h1>
            <h3>$ {productDetail?.price?.toLocaleString("es-ES")}</h3>
            <p>Disponibles: {productDetail?.stock}</p>
            <div className={style.containerButtonInput}>
              <input
                type="number"
                value={addToCart.quantity}
                onChange={handleQuantityChange}
                min={1}
                max={productDetail?.stock}
              />
              <button onClick={handleAddToCart} className={style.buttonProducts}>Añadir al carrito</button>
            </div>
          </div>
        </section>
      </div>

      <Accordion description={productDetail?.description}/>

      <section className={style.sectionRelatedProducts}>
        <h3>Productos Relacionados</h3>
        <div className={style.relatedContainer}>
          <RelatedProducts category={productDetail?.category} id={id} />
        </div>
      </section>

      <section className={style.sectionCallToAction}>
          <Link to={'/products'}><button onClick={scrollToTop}>Seguir comprando</button></Link>
      </section>
    </>
  );
}

export default ProductDetail