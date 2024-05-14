import { useState } from 'react'
import style from './PanelAdmin.module.css'
import AllProductsAdmin from '../../components/adminUtils/allProductsAdmin/AllProductsAdmin'
import CreateProduct from '../../components/adminUtils/createProduct/CreateProduct'
import AllUsersAdmin from '../../components/adminUtils/allUsersAdmin/AllUsersAdmin'
import AllSalesAdmin from '../../components/adminUtils/allSalesAdmin/AllSalesAdmin'
import AdminDetailProduct from '../../components/adminUtils/adminDetailProduct/AdminDetailProduc'
import UserDetail from '../../components/adminUtils/userDetail/UserDetail'

const PanelAdmin = () => {

  const [selectOption, setSelectOption] = useState({
    option: '',
    id: '',
    className:''
  })
  const [allUsers, setAllUsers] = useState([])

  const handleClick = (e) => {
    setSelectOption({
      ...selectOption,
      option: e.target.name
    })
  }

  return (
    <div className={style.containerPanelAdmin}>
      <div className={style.navPanelAdmin}>
        <button onClick={handleClick} className={`${style.buttonRef}`} name='products'>Productos</button>
        <button onClick={handleClick} className={`${style.buttonRef}`} name='create'>Crear Producto</button>
        <button onClick={handleClick} className={`${style.buttonRef}`} name='users'>Usuarios</button>
        <button onClick={handleClick} className={`${style.buttonRef}`} name='sales'>Ventas</button>
      </div>
      <div>
        {
          !selectOption
          ? null
          : selectOption.option === 'products'
          ? <AllProductsAdmin  setSelectOption={setSelectOption}/>
          : selectOption.option === 'create'
          ? <CreateProduct setSelectOption={setSelectOption}/>
          : selectOption.option === 'users'
          ? <AllUsersAdmin setSelectOption={setSelectOption} allUsers={allUsers} setAllUsers={setAllUsers}/>
          : selectOption.option === 'sales'
          ? <AllSalesAdmin/>
          : selectOption.option === 'detail'
          ? <AdminDetailProduct selectOption={selectOption} setSelectOption={setSelectOption}/>
          : selectOption.option === 'userDetail'
          ? <UserDetail selectOption={selectOption} setSelectOption={setSelectOption} allUsers={allUsers}/>
          : null

        }
      </div>
    </div>
  )
}

export default PanelAdmin