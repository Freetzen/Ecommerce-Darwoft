import style from './Filters.module.css';

const Filters = ({ applyFilters }) => {
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    applyFilters(category, null);
  };

  const handlePriceOrderChange = (e) => {
    const priceOrder = e.target.value;
    applyFilters(null, priceOrder);
  };

  return (
    <div>
      <div>
        <label htmlFor="category">Categoría</label>
        <select name="category" onChange={handleCategoryChange}>
          <option value="">Elegir una categoría</option>
          <option value="iPad">iPad</option>
          <option value="iPhone">iPhone</option>
          <option value="Apple Watch">Apple Watch</option>
          <option value="Macbook">Macbook</option>
        </select>
      </div>

      <div>
        <label htmlFor="priceOrder">Precio</label>
        <select name="priceOrder" onChange={handlePriceOrderChange}>
          <option value="">Elegir</option>
          <option value="menorMayor">Menor a mayor</option>
          <option value="mayorMenor">Mayor a menor</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
