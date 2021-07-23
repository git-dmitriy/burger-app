import React, { useState, useEffect } from 'react';
import { listProducts } from './ProductService';

const ProductsIndex = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await listProducts();
      setProducts(data);
    })();
  }, []);

  if (products === null) {
    return <div>Loading...</div>;
  }
  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default ProductsIndex;
