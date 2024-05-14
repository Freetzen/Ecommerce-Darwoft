import { productFilters } from '../../redux/productSlice';
import { useDispatch } from 'react-redux';

const Filters = ({categoryFilter, setCategoryFilter}) => {

  const dispatch = useDispatch()

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategoryFilter(category);
    dispatch(productFilters( category ))
  };

  const handlePriceOrderChange = (e) => {
    const priceOrder = e.target.value;
    dispatch(productFilters( priceOrder ))
  };

  return (
    <div>
      <div>
        <label htmlFor="category" defaultValue="disable">Categoría</label>
        <select name="category" onChange={handleCategoryChange} >
          <option value="disable" disabled>Elegir una categoría</option>
          <option value="iPad">iPad</option>
          <option value="iPhone">iPhone</option>
          <option value="Apple Watch">Apple Watch</option>
          <option value="Macbook">Macbook</option>
          <option value="reset">Reset</option>
        </select>
      </div>

      <div>
        <label htmlFor="priceOrder">Precio</label>
        <select name="priceOrder" onChange={handlePriceOrderChange}>
          <option value="" disabled >Elegir</option>
          <option value="menorMayor">Menor a mayor</option>
          <option value="mayorMenor">Mayor a menor</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
