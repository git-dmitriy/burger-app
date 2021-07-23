import React from 'react';
import { css } from '@emotion/css';
import { Outlet } from 'react-router-dom';

const ProductsStyles = css`
  display: flex;
  flex-direction: column;
  .logo {
    width: 125px;
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
    <Outlet />
  </div>
);

export default Products;
