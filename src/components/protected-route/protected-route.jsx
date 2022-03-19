import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../../utils/functions';
import { getUserData } from '../../services/actions/user';


export function ProtectedRoute({ children, ...rest }) {
  const { isAuthenticated } = useSelector(state => state.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}