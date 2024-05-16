import style from './AdminDetailProduc.module.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putProductAdmin } from '../../../redux/productSlice';
import productProvider from '../../../utils/productProvider/productProvider';


const AdminDetailProduct = ({ setSelectOption, selectOption }) => {

  const dispatch = useDispatch()

  const { products } = useSelector((state) => state.product);
  const [productDetail, setProductDetail] = useState({});

  const categories = ['iPhone', 'Macbook', 'iPad', 'Apple Watch']
  const productFiltered = () => {
    return products?.find((product) => product._id === selectOption.id) || {};
  };

  useEffect(() => {
    setProductDetail(productFiltered());
  }, [selectOption.id]);

  const handleChange = (e) => {
    
    setProductDetail({
      ...productDetail,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0]  
    try {
      const upload = await productProvider.uploadImage(file)
      setProductDetail({
        ...productDetail,
        image: upload.secure_url
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const update = await dispatch(putProductAdmin(productDetail))
  };

  return (
    <div className={style.prueba}>
      <div className={style.loginContainer}>
      <form className={style.formLogin}>
        <label>Title</label>
        <input type="text" name="title" value={productDetail.title || ''} onChange={handleChange}/>

        <label>Descripción</label>
        <textarea name="description" value={productDetail.description || ''} onChange={handleChange}/>

        <label>Imagen</label>
        <img className={style.imgDetail} src={productDetail.image} alt="" />
        <input type="file" name="image" onChange={handleFileChange}/>

        <label>Precio</label>
        <input type="number" name="price" value={productDetail.price || ''} onChange={handleChange}/>

        <label>Stock</label>
        <input type="number" name="stock" value={productDetail.stock || ''} onChange={handleChange}/>

        <label>Categoría</label>
        <select name="category" value={productDetail.category || false} onChange={handleChange}>
          {
            categories.map((category) =>(
              <option key={category} value={category}>{category}</option>
            ))
          }
        </select>

        <label>Destacado</label>
        <select name="featured" value={productDetail.featured || false} onChange={handleChange}>
          <option value={false}>No destacado</option>
          <option value={true}>Destacado</option>
        </select>

        <label>Estado</label>
        <select name="active" value={productDetail.active || false} onChange={handleChange}>
          <option value={false}>Inactivo</option>
          <option value={true}>Activo</option>
        </select>

      </form>
        <div className={style.divButtons}>
        <button onClick={handleUpdateProduct}>Actualizar</button>
        <button onClick={() => setSelectOption({ option: "products" })}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailProduct;