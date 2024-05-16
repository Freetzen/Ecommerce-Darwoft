import style from './Filters.module.css'
import { useEffect, useState } from 'react';
import { productFilters, productFiltersByPrice } from '../../redux/productSlice';
import { useDispatch } from 'react-redux';

const Filters = ({categoryFilter, setCategoryFilter}) => {

  const dispatch = useDispatch()
  const [priceOrder, setPriceOrder] = useState(null)

  useEffect(() => {
    if(categoryFilter === 'reset'){
      setPriceOrder('disable');
    }
  }, [categoryFilter]);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    dispatch(productFilters(e.target.value));
  };

  const handlePriceOrderChange = (e) => {
    dispatch(productFiltersByPrice(e.target.value))
  };

  return (
    <div className={style.filterContainer}>
      <div className={style.filerDiv}>
        <label htmlFor="category">Categoría</label>
        <select name="category" defaultValue="disable" onChange={handleCategoryChange} >
          <option value="disable" disabled>Elegir una categoría</option>
          <option value="iPad">iPad</option>
          <option value="iPhone">iPhone</option>
          <option value="Apple Watch">Apple Watch</option>
          <option value="Macbook">Macbook</option>
          <option value="reset">Todos</option>
        </select>
      </div>

      <div className={style.filerDiv}>
        <label htmlFor="priceOrder">Precio</label>
        <select name="priceOrder" defaultValue="disable" onChange={handlePriceOrderChange}>
          <option value={priceOrder === '' ? priceOrder : "disable"} disabled >Elegir</option>
          <option value="menorMayor">Menor a mayor</option>
          <option value="mayorMenor">Mayor a menor</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
