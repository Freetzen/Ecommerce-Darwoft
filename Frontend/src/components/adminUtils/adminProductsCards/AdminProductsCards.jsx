import style from './AdminProductsCards.module.css'
import { FaTrash } from "react-icons/fa";

const AdminProductsCards = ({title, id, price, stock, setSelectOption, handleDelete}) => {

    const handleClick = (e) => {
        setSelectOption({
            option: e.target.name,
            id
        })
    }

  return (
    <tr className={style.trInfoProducts}>
      <td>{title}</td>
      <td>$ {price.toLocaleString('es-ES')}</td>
      <td>{stock}</td>
      <td className={style.tdButtonProducts}>
        <button onClick={handleClick} name="detail">
          Editar
        </button>
      </td>
      <td className={style.tdButtonTrash}>
        <button onClick={()=> handleDelete(id)} name="trash">
          <FaTrash/>
        </button>
      </td>
    </tr>
  );
}

export default AdminProductsCards