import style from './UserPurchases.module.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ticketsProvider from '../../utils/ticketsProvider/ticketsProvider'
import { FiAlertCircle } from "react-icons/fi";
import { MdOutlineCheckCircle } from "react-icons/md";
import { GoXCircle } from "react-icons/go";



const UserPurchases = () => {

  const {user} = useSelector((state) => state.auth)
  const [purchases, setPurchases] = useState([])
  useEffect(() => {
    const purchases = async () => {
      try {
        const purch = await ticketsProvider.getTicketUser(user.id)
        setPurchases(purch.data.data)
        return purch.data.data
      } catch (error) {
        console.log(error.message)
      }
    }
    purchases()
  }, [])

  function switchStatus(key){
    switch (key) {
      case 'approve':
        return <MdOutlineCheckCircle className={style.iconStatusApprove}/>
      case 'pending':
        return <FiAlertCircle className={style.iconStatusPending} />
      case 'refused':
        return <GoXCircle className={style.iconStatusRefused}/>
      default:
        break;
    }
  }

  return (
    <div className={style.purchasesContainer}>
    <h2>{purchases ? 'Mis Compras' : 'Aún no hay compras'}</h2>
    {purchases?.filter((purchase) => ['approve', 'pending'].includes(purchase.statusPayment))
  .map((purchase, index) => (
    <div key={`${purchase.idProduct}-${index}`} className={style.purchaseCard}>
      <table className={style.purchaseTable}>
        <thead>
          <tr>
            <th colSpan="5">Compra #{index + 1} | {switchStatus(purchase.statusPayment)}</th>
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
  );
}

export default UserPurchases