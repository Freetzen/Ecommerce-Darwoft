import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import localStorageProvider from '../../utils/localStorageProvider/localStorageProvider'
import userProvider from '../../utils/userProvider/userProvider'
import Swal from 'sweetalert2'
import LoaderLight from '../loaderLight/LoaderLight'


const ProtectedRouteUser = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const token = localStorageProvider.getToken()
    
    const validatingUser = async () => {
        try {
            const val = await userProvider.protectedRouteValidate()
            setLoading(false)

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
      if (!token) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Debe iniciar sesión!`,
          showConfirmButton: false,
          timer: 1200,
        });
        return navigate("/login");
      }
      validatingUser();
    }, []);
    

  return (
    <>
        {
          loading 
          ? <LoaderLight/>
          : <Outlet/>
        }
    </>
  )
}

export default ProtectedRouteUser
