import React, { useState, useEffect } from 'react';
import { listProducts } from './ProductService';
import ProductCard from './ProductCard';
import { useLocation } from 'react-router';

const ProductsIndex = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState(null);
  useEffect(() => {
    if (state) {
      console.warn(`Nothing found for ${state.id}`);
    }
  }, []);

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
