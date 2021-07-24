import React, { useState, useEffect } from 'react';
import { listProducts } from './ProductService';
import ProductCard from './ProductCard';

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
    <ul style={{ padding: '0', listStyle: 'none' }}>
      {products.map((item) => (
        <ProductCard product={item} key={item.id} />
      ))}
    </ul>
  );
};

export default ProductsIndex;
