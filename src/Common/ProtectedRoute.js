import React from 'react';
import { Route } from 'react-router';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, authenticated, redirectTo, ...rest }) => {
  if (!authenticated) {
    return <Navigate to={redirectTo} />;
  }
  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
