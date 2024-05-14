import style from './Cart.module.css'
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardItems from '../../components/cardItems/CardItems'

const Cart = () => {
  const localCart = JSON.parse(localStorage.getItem("cart"));
  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)
  const { products } = useSelector((state) => state.product)
  const [productsInfo, setProductsInfo] = useState([])

  useEffect(() => {
    if(!localCart) return
    const productsInCart = localCart.map((cartItem) => {
        const product = products?.find(
          (product) => product._id === cartItem.id
        );
        if (product) {
          return {
            ...product,
            quantity: cartItem.quantity,
          };
        }
        return null;
      })
      .filter((product) => product !== null);
    setProductsInfo(productsInCart);
    setLoading(false)
  }, [products]);

const handleIncrementQuantity = (productId) => {
  const updatedProducts = productsInfo.map(product => {
      if (product._id === productId) {
          return {
              ...product,
              quantity: product.quantity + 1
          };
      }
      return product;
  });
  setProductsInfo(updatedProducts);
  updateLocalStorage(updatedProducts);
};


const handleDecrementQuantity = (productId) => {
  const updatedProducts = productsInfo.map(product => {
      if (product._id === productId && product.quantity > 1) {
          return {
              ...product,
              quantity: product.quantity - 1
          };
      }
      return product;
  });
  setProductsInfo(updatedProducts);
  updateLocalStorage(updatedProducts);
};

const handleRemoveProduct = (productId) => {
  const updatedProducts = productsInfo.filter(product => product._id !== productId);
  setProductsInfo(updatedProducts);
  updateLocalStorage(updatedProducts);
};
const updateLocalStorage = (updatedProducts) => {
  const cart = updatedProducts.map(product => ({
      id: product._id,
      quantity: product.quantity
  }));
  localStorage.setItem('cart', JSON.stringify(cart));
};

const totalPrice = productsInfo.reduce((total, product) => total + (product.price * product.quantity), 0);


const handlePay = async () => {
  const info = productsInfo.map(product => ({
      idProduct: product._id,
      quantity: product.quantity,
      priceByProducts: product.price * product.quantity
  }));
  const totalPrice = productsInfo.reduce((total, product) => total + (product.price * product.quantity), 0);

  const data = {
      info,
      totalPrice,
      idClient: user.id,
      status: 'approve'
  };
  localStorage.removeItem('cart')
  setProductsInfo({})
  console.log(data)
};



  return (
      <div className={style.cartContainer}>
        {
        !localCart
        ? <div>
          <h1>Carrito vacío!</h1>
          <Link to={'/products'}>Ver productos</Link>
        </div>
        :
          <div>
          <h2>Carrito de Compras</h2>
          {productsInfo.map(product => (
            <div key={product._id} >
              <CardItems
              image={product.image}
              title={product.title}
              price={product.price}
              quantity={product.quantity}
              _id={product._id}
              handleDecrementQuantity={handleDecrementQuantity}
              handleIncrementQuantity={handleIncrementQuantity}
              handleRemoveProduct={handleRemoveProduct}
              />
              </div>
          ))}
          <div>
                <p>Total a Pagar: ${(totalPrice).toFixed(2)}</p>
                <button onClick={handlePay}>PAGAR</button>
            </div>
      </div>
        }
        
      </div>
  )
}

export default Cart