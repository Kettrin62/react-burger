import * as React from 'react';
import { useSelector } from '../../services/hooks';
import { Redirect, Route } from 'react-router-dom';
import { FC } from 'react';
import { RouteProps } from 'react-router-dom';


export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
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