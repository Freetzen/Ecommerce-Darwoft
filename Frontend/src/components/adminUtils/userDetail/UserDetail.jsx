import style from './UserDetail.module.css'
import React,{ useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { userPurchaseAsync, userUpdateAdmin } from '../../../redux/authSlice';

const UserDetail = ({setSelectOption, selectOption, allUsers}) => {

  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState({})
  const [userPurchases, setUserPurchases] = useState([])
  const userFiltered = () => {
    return allUsers.find((item) => item._id === selectOption.id)
  };

  const sales = async() => {
    try {
      const salesUser = await dispatch(userPurchaseAsync(selectOption.id))
      return setUserPurchases(salesUser.payload.data)
    } catch (error) {
      console.log(first)
    }
  };  

  useEffect(() => {
    setUserInfo(userFiltered())
    sales()
  }, [])
  
  const handleChange = (e) => {
    
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async(e) => {
    e.preventDefault()
    const update = await dispatch(userUpdateAdmin(userInfo))
    console.log(update)
  }

  return (
    <div className={style.prueba}>
      <div className={style.loginContainer}>
        <h2>{userInfo.email}</h2>
        <form className={style.formLogin}>
          <label>Estado</label>
          <select
            name="banned"
            value={userInfo.banned || false}
            onChange={handleChange}
          >
            <option value={false}>No baneado</option>
            <option value={true}>Baneado</option>
          </select>

          <label>Rol</label>
          <select
            name="role"
            value={userInfo.role || false}
            onChange={handleChange}
          >
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>

          <div className={style.divButtons}>
          <button onClick={handleUpdate}>Actualizar</button>
          <button onClick={() => setSelectOption({ option: "users" })}>
            Cancelar
          </button>
          </div>
        </form>
      </div>
      <div className={style.divSales}>
      <h3>{userPurchases?.length ? `Ventas: ${userPurchases?.length}` : 'No hay ventas'}</h3>
        <div className={style.tableGrid}>
        {userPurchases?.map((purchase, index) => (
      <div key={`${purchase.idProduct}-${index}`} className={style.purchaseCard}>
        <table className={style.purchaseTable}>
          <thead>
            <tr>
              <th colSpan="5">Compra #{index + 1}</th>
            </tr>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
              <th>Fecha de Compra</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{purchase.products[0].idProduct.title}</td>
              <td>{purchase.products[0].quantity}</td>
              <td>${purchase.products[0].priceByProducts}</td>
              <td rowSpan={purchase.products.length}>${purchase.products.reduce((total, product) => total + product.priceByProducts, 0)}</td>
              <td rowSpan={purchase.products.length}>{new Date(purchase.createdAt).toLocaleDateString()}</td>
            </tr>
            {purchase.products.slice(1).map((product) => (
              <tr key={product.idProduct._id}>
                <td>{product.idProduct.title}</td>
                <td>{product.quantity}</td>
                <td>${product.priceByProducts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
        </div>
      </div>
    </div>
  );
}

export default UserDetail