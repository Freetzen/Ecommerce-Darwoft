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
  const [loading, setLoading] = useState(true)

  const handleClick = (e) => {
    setSelectOption({
      ...selectOption,
      option: e.target.name
    })
  }

  const activeProducts = selectOption.option === 'products' || selectOption.option === 'detail'
  const activeUsers = selectOption.option === 'users' || selectOption.option === 'userDetail'
  const activeCreateProduct = selectOption.option === 'create'
  const activeSales = selectOption.option === 'sales'

  return (
    <div className={style.containerPanelAdmin}>
      <div className={style.navPanelAdmin}>
        <button onClick={handleClick} className={`${style.buttonRef} ${activeProducts ? style.isActive : ''}`} name='products'>Productos</button>
        <button onClick={handleClick} className={`${style.buttonRef} ${activeCreateProduct ? style.isActive : ''}`} name='create'>Crear Producto</button>
        <button onClick={handleClick} className={`${style.buttonRef} ${activeUsers ? style.isActive : ''}`} name='users'>Usuarios</button>
        <button onClick={handleClick} className={`${style.buttonRef} ${activeSales ? style.isActive : ''}`} name='sales'>Ventas</button>
      </div>
      <div>
        {
          !selectOption
          ? null
          : selectOption.option === 'products'
          ? <AllProductsAdmin  setSelectOption={setSelectOption} setLoading={setLoading} loading={loading}/>
          : selectOption.option === 'create'
          ? <CreateProduct setSelectOption={setSelectOption}/>
          : selectOption.option === 'users'
          ? <AllUsersAdmin setSelectOption={setSelectOption} allUsers={allUsers} setAllUsers={setAllUsers} setLoading={setLoading} loading={loading}/>
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