import * as React from 'react';
import { useSelector } from '../../services/hooks';
import { Redirect, Route } from 'react-router-dom';
import { FC } from 'react';

interface IProtectedRouteProps {
  path: string;
  exact: boolean;
};


export const ProtectedRoute: FC<IProtectedRouteProps> = ({ children, ...rest }) => {
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