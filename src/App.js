import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, useRoutes } from 'react-router-dom';
import Admin from './Admin/Admin';
import Products from './Products/Products';
import Nav from './Common/Nav';
import { css } from '@emotion/css';
import ScrollToTop from './Common/ScrollToTop';

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
  const [authenticated] = useState(true);
  const routes = useRoutes([
    {
      path: '/*',
      element: <Products />,
    },
    {
      path: '/admin*',
      element: authenticated ? <Admin /> : <Navigate to='/' />,
    },
    {
      path: '*',
      element: <Navigate to='/' />,
    },
  ]);
  return routes;
};

const AppWrapper = () => (
  <div className={AppStyles}>
    <Router>
      <ScrollToTop />
      <div className='Container'>
        <Nav />
        <App />
      </div>
    </Router>
  </div>
);

export default AppWrapper;
