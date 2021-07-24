import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Admin from './Admin/Admin';
import Products from './Products/Products';
import ProtectedRoute from './Common/ProtectedRoute';
import Nav from './Common/Nav';
import { css } from '@emotion/css';

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

  return (
    <div className={AppStyles}>
      <Router>
        <div className='Container'>
          <Nav />
          <Routes>
            <Route path='/*' element={<Products />} />
            <ProtectedRoute
              path='/admin'
              element={<Admin />}
              authenticated={authenticated}
              redirectTo='/'
            />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
