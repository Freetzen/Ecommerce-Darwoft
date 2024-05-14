import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { validateLoginAsync } from './redux/authSlice'
import { getAllProducts } from './redux/productSlice'
import Login from './pages/login/Login'
import axios from 'axios'
import Home from './pages/home/Home'
import PanelAdmin from './pages/panelAdmin/PanelAdmin'
import PanelUser from './pages/panelUser/PanelUser'
import Register from './pages/register/Register'
import NavBar from './components/navBar/NavBar'
import Footer from './components/footer/Footer'
import localStorageProvider from './utils/localStorageProvider/localStorageProvider'
import AdminDetailProduc from './components/adminUtils/adminDetailProduct/AdminDetailProduc'
import ProductDetail from './pages/productDetail/ProductDetail'
import Products from './pages/products/Products'
import Cart from './pages/cart/Cart'
import ProtectedRouteAdmin from './components/protectedRoute/ProtectedRouteAdmin'
import ProtectedRouteUser from './components/protectedRoute/ProtectedRouteUser'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


const token = localStorageProvider.getToken()
function App() {

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();

  const bringingProducts = async () => {
    await dispatch(getAllProducts());
  };

  const validate = async() => {
    setLoading(true)
    await dispatch(validateLoginAsync())
    setLoading(false)
  }

  useEffect(() => {
    bringingProducts();
    if(!token) return
      validate()
  }, []);

  return (
    <>
    <NavBar loading={loading}/>
    <main>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route element={<ProtectedRouteAdmin/>}>
        <Route path={'/backoffice'} element={<PanelAdmin />} /> {/* RUTA DEL ADMINISTRADOR */}
        <Route path='/backoffice/:id' element={<AdminDetailProduc/>}/>
        </Route>

        <Route element={<ProtectedRouteUser/>}>
        <Route path='/account' element={<PanelUser loading={loading}/>}/>
        </Route>

        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:id' element={<ProductDetail/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
