import style from './Cart.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from "react-icons/fa";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaCircleMinus } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { postTicket } from '../../redux/productSlice';

const Cart = () => {
  const localCart = JSON.parse(localStorage.getItem('cart'));
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);

  const [loading, setLoading] = useState(true);
  const [productsInfo, setProductsInfo] = useState([]);

  useEffect(() => {
    if (!localCart) return;
    const productsInCart = localCart
      .map((cartItem) => {
        const product = products?.find((product) => product._id === cartItem.id);
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
    setLoading(false);
  }, [products]);

  const handleIncrementQuantity = (productId) => {
    const product = products.find((product) => product._id === productId);
    const existingProduct = productsInfo.find((product) => product._id === productId);
    if (existingProduct && existingProduct.quantity >= product.stock) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `No hay suficiente stock para incrementar la cantidad`,
        showConfirmButton: false,
        timer: 1200,
      });
      return;
    }
    const updatedProducts = productsInfo.map((product) => {
      if (product._id === productId) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    setProductsInfo(updatedProducts);
    updateLocalStorage(updatedProducts);
  };

  const handleDecrementQuantity = (productId) => {
    const updatedProducts = productsInfo.map((product) => {
      if (product._id === productId && product.quantity > 1) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }
      return product;
    });
    setProductsInfo(updatedProducts);
    updateLocalStorage(updatedProducts);
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = productsInfo.filter((product) => product._id !== productId);
    setProductsInfo(updatedProducts);
    updateLocalStorage(updatedProducts);
    if(!updatedProducts.length) return localStorage.removeItem('cart');
  };

  const updateLocalStorage = (updatedProducts) => {
    const cart = updatedProducts.map((product) => ({
      id: product._id,
      quantity: product.quantity,
    }));
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const totalPrice = productsInfo.reduce((total, product) => total + product.price * product.quantity, 0);

  const handlePay = async (e) => {
    if (!user) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Debes iniciar sesión para finalizar la compra`,
        showConfirmButton: false,
        timer: 1200,
      });
      return navigate('/login');
    }
  
    const info = productsInfo.map((product) => ({
      idProduct: product._id,
      title: product.title,
      quantity: product.quantity,
      priceByProducts: product.price * product.quantity,
      image: product.image
    }));
  
    const totalPrice = productsInfo.reduce((total, product) => total + product.price * product.quantity, 0);
  
    let data = {
      info,
      totalPrice,
      idClient: user.id,
      firstname: user.firstname,
      email: user.email
    };
  
    switch (e.target.name) {
      case 'refused':
        data = { ...data, status: 'refused' };
        break;
      case 'pending':
        data = { ...data, status: 'pending' };
        break;
      case 'approve':
        data = { ...data, status: 'approve' };
        break;
      default:
        break;
    }
  
    const sale = await dispatch(postTicket(data));
  
    if (sale.payload.success) {
      const icon = sale.payload.success ? 'success' : 'error';
      Swal.fire({
        position: "center",
        icon,
        title: `${sale.payload.message}`,
        showConfirmButton: false,
        timer: 2500,
      });
      localStorage.removeItem('cart')
      return navigate('/account')
    }

      return Swal.fire({
        position: "center",
        icon:  'error',
        title: `${sale.payload.message}`,
        showConfirmButton: false,
        timer: 2500,
      });
  
  };
  

  return (
    <div className={style.cartContainer}>
      {!localCart ? (
        <div className={style.divCartEmpty}>
          <h1>Carrito vacío!</h1>
          <Link to={'/products'}><button>Ver productos</button></Link>
        </div>
      ) : (
        <div className={style.containerTableCart}>
          <h2>Carrito de Compras</h2>
          <div className={style.tableContainer}>
            <table className={style.cartTable}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cant.</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productsInfo.map((product) => (
                  <tr key={product._id}>
                    <td>{product.title}</td>
                    <td>${product.price.toLocaleString("es-ES")}</td>
                    <td>{product.quantity}</td>
                    <td>${(product.price * product.quantity).toLocaleString("es-ES")}</td>
                    <td className={style.productRemove}>
                      <div className={style.divMinusPlus}>
                      <button className={style.minusPlus} onClick={() => handleDecrementQuantity(product._id)}><FaCircleMinus /></button>
                      <button className={style.minusPlus} onClick={() => handleIncrementQuantity(product._id)}><BsPlusCircleFill /></button>
                      </div>
                      <div>
                      <button className={style.productTrash} onClick={() => handleRemoveProduct(product._id)}><FaTrash/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={style.totalContainer}>
            <p>Total a Pagar: ${totalPrice.toLocaleString("es-ES")}</p>
            <button onClick={handlePay} name='approve'>PAGAR</button>
            <button onClick={handlePay} name='pending'>PENDIENTE</button>
            <button onClick={handlePay} name='refused'>RECHAZADO</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
