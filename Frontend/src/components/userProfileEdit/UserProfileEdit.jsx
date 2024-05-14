import style from './UserProfileEdit.module.css'
import React, { useRef, useState } from 'react'
import productProvider from '../../utils/productProvider/productProvider'
import userProvider from '../../utils/userProvider/userProvider'
import { useDispatch, useSelector } from 'react-redux'
import { updateImg } from '../../redux/authSlice'
import Swal from 'sweetalert2'

const UserProfileEdit = () => {

  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const formRef = useRef(null)

  const [imgUpload, setImgUpload] = useState({
    id: user.id,
    image:''
  })
  const handleFileChange = async (e) => {
    const file = e.target.files[0]  
    try {
      const upload = await productProvider.uploadImage(file)
      setImgUpload({
        ...imgUpload,
        image: upload.secure_url
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updateUser = await userProvider.putUser(imgUpload)
    if(updateUser.data) {
      formRef.current.reset();
      setImgUpload({
        id: user.id,
        image:''
      })
      return dispatch(updateImg(updateUser.data.image));
    }

    return Swal.fire({
      position: "center",
      icon: "error",
      title: `${updateUser.message}`,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  const buttonDisable = imgUpload.image.trim().length > 0 ? true : false

  return (
    <div className={style.createProduct}>
        <div className={style.containerForm}>
        <form ref={formRef} onSubmit={handleSubmit} className={style.formCreate}>
            <label>Actualizar imagen de perfil</label>
            <input type="file" accept="image/png, image/jpg" onChange={handleFileChange}/>

            <button type='submit' disabled={!buttonDisable} className={!buttonDisable ? style.disable : ''}>Actualizar</button>
        </form>
        </div>
    </div>
  )
}

export default UserProfileEdit