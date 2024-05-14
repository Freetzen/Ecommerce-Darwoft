import style from './PanelUser.module.css'
import { useState } from 'react'
import LoaderLight from '../../components/loaderLight/LoaderLight'
import { useSelector } from 'react-redux'
import UserPurchases from '../../components/userPurchases/UserPurchases'
import UserProfileEdit from '../../components/userProfileEdit/UserProfileEdit'

const PanelUser = ({loading}) => {

  const [selectOption, setSelectOption] = useState(null)
  const {user} = useSelector((state) => state.auth)

  const handleClick = (e) => {
    setSelectOption(e.target.name)
  }

  return (
    <div className={style.panelUserContainer}>
      {loading ? (
        <LoaderLight />
      ) : (
        <div className={style.navPanelUser}>
          <div className={style.headerPanelUser}></div>
          <div className={style.navPanelInfo}>
            <div className={style.imgContainer}>
            <img
              className={style.profileImage}
              src={user?.image}
              alt="imagen perfil"
            />
            </div>
            <h2>
              {user?.firstname} {user?.lastname}
            </h2>
            <h4>{user?.email}</h4>
          </div>
          <div className={style.navPaneButton}>
            <button onClick={handleClick} name="purchases" className={style.buttonRef}>
              Mis compras
            </button>
            <button onClick={handleClick} name="edit" className={style.buttonRef}>
              Editar perfil
            </button>
          </div>
        </div>
      )}
      <div>
        {!selectOption ? null : selectOption === "purchases" ? (
          <UserPurchases />
        ) : (
          <UserProfileEdit />
        )}
      </div>
    </div>
  );
}

export default PanelUser