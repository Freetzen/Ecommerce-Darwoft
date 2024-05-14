import style from './CreateProduct.module.css'
import { useRef, useState } from 'react'
import productProvider from '../../../utils/productProvider/productProvider'
import { useDispatch } from 'react-redux'
import { createProduct } from '../../../redux/productSlice'
import Swal from 'sweetalert2'
import creteProductValidator from './creteProductValidator'

const inicialState = {
  title: '',
  description: '',
  image: '',
  price: '',
  stock: '',
  category: '',
  featured: false,
  active: true
}
const CreateProduct = () => {

  const dispatch = useDispatch()

  const [errors, setErrors] = useState({})
  const [product, setProduct] = useState(inicialState)
  const formRef = useRef(null)

  const categories = ['Seleccionar Categoría', 'iPhone', 'Macbook', 'iPad', 'Apple Watch']

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })

    setErrors(creteProductValidator({
      ...product,
      [e.target.name]: e.target.value
    }))

  }
  const handleFileChange = async (e) => {
    const file = e.target.files[0]  
    try {
      const upload = await productProvider.uploadImage(file)
      setProduct({
        ...product,
        image: upload.secure_url
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validating = creteProductValidator(product);
      if (Object.keys(validating).length) {
        return setErrors({
          title: validating.title,
          description: validating.description,
          image: validating.image,
          price: validating.price,
          stock: validating.stock,
          category: validating.category,
          notification: true,
        });
      }

    const ala = await dispatch(createProduct(product))
    console.log(ala)
    if(ala.payload?.success){
      formRef.current.reset();
      setProduct(inicialState)
      return Swal.fire({
        position: "center",
        icon: "success",
        title: `Producto creado correctamente`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }

  return (
    <div className={style.prueba}>
      <div className={style.loginContainer}>
      <form ref={formRef} onSubmit={handleSubmit} className={style.formLogin}>

        <label htmlFor="">Titulo</label>
        <input type="text" name="title"  value={product.title} onChange={handleChange}/>
        {errors.notification && <p className={style.errors}>{errors.title}</p>}

        <label htmlFor="">Descripcion</label>
        <textarea type="text" name="description" value={product.description}  onChange={handleChange}/>
        {errors.notification && <p className={style.errors}>{errors.description}</p>}

        <label htmlFor="">Imagen</label>
        <input type="file" name="image" onChange={handleFileChange}/>
        {errors.notification && <p className={style.errors}>{errors.image}</p>}

        <label htmlFor="">Precio</label>
        <input type="number" name="price" value={product.price}  onChange={handleChange}/>
        {errors.notification && <p className={style.errors}>{errors.price}</p>}

        <label htmlFor="">Stock</label>
        <input type="number" name="stock" value={product.stock}  onChange={handleChange}/>
        {errors.notification && <p className={style.errors}>{errors.stock}</p>}

        <label>Categoría</label>
        <select name="category" value={product.category} onChange={handleChange}>
          {
            categories.map((category) =>(
              <option key={category} name={category} value={category}>{category}</option>
            ))
          }
        </select>
        {errors.notification && <p className={style.errors}>{errors.category}</p>}

        <label htmlFor="">Destacado</label>
        <select type="text" name="featured" value={product.featured}  onChange={handleChange}>
          <option value={false} key="false">No destacado</option>
          <option value={true} key="true">Destacado</option>
        </select>

        <label htmlFor="">Estado</label>
        <select type="text" name="active" value={product.active}  onChange={handleChange}>
          <option value={true} key="true">Activo</option>
          <option value={false} key="false">Inactivo</option>
        </select>

        <button type='submit'>Crear</button>
      </form>
      </div>
    </div>
  )
}

export default CreateProduct