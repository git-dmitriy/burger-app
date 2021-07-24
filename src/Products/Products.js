import React from 'react';
import { css } from '@emotion/css';
import { Routes, Route } from 'react-router-dom';
import Product from './Product';
import ProductsIndex from './ProductsIndex';

const ProductsStyles = css`
  display: flex;
  flex-direction: column;
  .Logo {
    margin: 0 auto 25px;
  }
`;

const Products = () => (
  <div className={ProductsStyles}>
    <img
      className='Logo'
      src='/assets/img/logo.svg'
      alt='Ultimate Burgers Logotype'
    />
    <Routes>
      <Route path='/' element={<ProductsIndex />} />
      <Route path=':id' element={<Product />} />
    </Routes>
  </div>
);

export default Products;
