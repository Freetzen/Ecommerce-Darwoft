import style from './RelatedProducts.module.css';
import React, { memo } from 'react';
import CardProduct from '../cardProduct/CardProduct';
import { useSelector } from 'react-redux';

const RelatedProducts = ({ category, id }) => {
  const { products } = useSelector((state) => state.product);
  const findRelated = products
    ?.filter((product) => product.category === category && product._id !== id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <div className={style.containerCardProducts}>
      {findRelated?.map((item) => (
        <CardProduct
          key={item._id}
          id={item._id}
          title={item.title}
          brand={item.brand}
          image={item.image}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default memo(RelatedProducts);
