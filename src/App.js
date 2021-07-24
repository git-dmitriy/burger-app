import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Admin from './Admin/Admin';
import Products from './Products/Products';
import Product from './Products/Product';
import Nav from './Common/Nav';
import { css } from '@emotion/css';
import ProductsIndex from './Products/ProductsIndex';

const AppStyles = css`
  margin: 50px auto;
  width: 380px;
  .Container {
    background-color: #1d1e26;
    border: 4px solid #9580ff;
    border-radius: 6px;
    padding: 25px;
  }
`;

const App = () => {
  return (
    <div className={AppStyles}>
      <Router>
        <div className='Container'>
          <Nav />
          <Routes>
            <Route path='/' element={<Products />}>
              <Route path='/' element={<ProductsIndex />} />
              <Route path=':id' element={<Product />} />
            </Route>
            <Route path='/admin' element={<Admin />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
