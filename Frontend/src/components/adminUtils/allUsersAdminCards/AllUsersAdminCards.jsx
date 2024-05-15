import style from './AllUsersAdminCards.module.css'
import { FaBan } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

const AllUsersAdminCards = ({setSelectOption, role, banned, id, email}) => {

    const handleClick = (e) => {
        setSelectOption({
            option: e.target.name,
            id
        })
    }

  return (
    <tr className={style.trInfoUsers}>
      <td>{email}</td>
      <td>{role}</td>
      <td className={style.tdStatus}>{!banned ? <FaCheck className={style.banned}/> : <FaBan className={style.isBanned}/>}</td>
      <td className={style.tdButtonUsers}>
        <button onClick={handleClick} name="userDetail">
          Editar
        </button>
      </td>
    </tr>
  )
}

export default AllUsersAdminCards