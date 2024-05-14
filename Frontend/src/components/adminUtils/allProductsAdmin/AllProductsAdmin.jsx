import style from './AllProductsAdmin.module.css'
import React, { useEffect, useState } from 'react'
import productProvider from '../../../utils/productProvider/productProvider'
import AdminProductsCards from '../adminProductsCards/AdminProductsCards'
import { deleteProductAdmin, deletedProduct, getAllProductsAdmin } from '../../../redux/productSlice'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import LoaderLight from '../../loaderLight/LoaderLight'
const AllProductsAdmin = ({setSelectOption, setLoading, loading}) => {

  const dispatch = useDispatch()

  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setLoading(true)
   const getProducts = async () => {
    const products = await dispatch(getAllProductsAdmin())
    setAllProducts(products.payload.data)
    setFilteredProducts(products.payload.data)
    setLoading(false)
  }
  getProducts()
  }, [])

  const handleSearch = () => {
    const filtered = allProducts?.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }

  useEffect(() => {
    handleSearch()
   }, [searchTerm])

   const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Seguro quieres eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Producto eliminado correctamente!`,
          showConfirmButton: false,
          timer: 1000,
        });
        dispatch(deleteProductAdmin(id));
        const deleted = filteredProducts?.filter(product => product._id !== id);
        setFilteredProducts(deleted)
        dispatch(deletedProduct(id))
      }
    });
   }

  return (
    <>
      {loading 
      ? (<LoaderLight />) 
      : (
        <div className={style.tableProducts}>
          <div className={style.inputSearch}>
            <input
              type="text"
              placeholder="Buscar por titulo..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table>
            <thead>
              <tr className={style.trTitlesProducts}>
                <th>Titulo</th>
                <th>Precio</th>
                <th>Stock</th>
                <th className={style.thButtonProducts}>Acción</th>
                <th className={style.thButtonTrash}>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.map((e) => (
                <AdminProductsCards
                  key={e._id}
                  handleDelete={handleDelete}
                  setSelectOption={setSelectOption}
                  stock={e.stock}
                  title={e.title}
                  price={e.price}
                  id={e._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AllProductsAdmin