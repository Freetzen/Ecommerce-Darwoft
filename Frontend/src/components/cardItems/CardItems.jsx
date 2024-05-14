import style from './CardItems.module.css'

const CardItems = ({image, title, price, quantity, _id, handleDecrementQuantity, handleIncrementQuantity, handleRemoveProduct}) => {
  return (
    <div><div key={_id} className={style.product}>
    {/* <img src={product.image} alt={product.title} /> */}
    <div className={style.productInfo}>
        <h3>{title}</h3>
        <p>Precio: ${(price * quantity).toFixed(2)}</p>
        <div>
            <button onClick={() => handleDecrementQuantity(_id)}>-</button>
            <span>Cantidad: {quantity}</span>
            <button onClick={() => handleIncrementQuantity(_id)}>+</button>
            <button onClick={() => handleRemoveProduct(_id)}>Eliminar</button>
        </div>
    </div>
</div></div>
  )
}

export default CardItems