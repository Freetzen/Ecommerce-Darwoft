import { Route, Routes, useNavigate } from 'react-router-dom'
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
import NotFound from './components/NotFound/NotFound'
import ProductsCategory from './pages/productsCategory/ProductsCategory'
import RestorePassword from './pages/restorePassword/RestorePassword'
import Contact from './pages/contact/Contact'
import Swal from 'sweetalert2'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


const token = localStorageProvider.getToken()
function App() {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('')

  const dispatch = useDispatch();

  const bringingProducts = async () => {
    await dispatch(getAllProducts());
  };

  const validate = async() => {
    setLoading(true)
    const login = await dispatch(validateLoginAsync())
    if(login.payload?.message === 'jwt expired'){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Debe iniciar sesión`,
        showConfirmButton: false,
        timer: 1200,
      });
      navigate('/login')
      localStorageProvider.deleteToken()
    }
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
      <Routes>
        <Route path='/' element={<Home setCategoryFilter={setCategoryFilter}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>

        <Route element={<ProtectedRouteAdmin/>}>
          <Route path={'/backoffice'} element={<PanelAdmin />} /> {/* RUTA DEL ADMINISTRADOR */}
          <Route path='/backoffice/:id' element={<AdminDetailProduc/>}/>
        </Route>

        <Route element={<ProtectedRouteUser/>}>
        <Route path='/account' element={<PanelUser loading={loading}/>}/>
        </Route>

        <Route path='/products' element={<Products categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}/>}/>
        <Route path='/products/:id' element={<ProductDetail/>}/>
        <Route path='/products/category/:category' element={<ProductsCategory/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/restore-password' element={<RestorePassword/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
