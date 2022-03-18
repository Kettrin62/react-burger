import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../../utils/functions';
import { getUserData } from '../../services/actions/user';


export function ProtectedRoute({ children, ...rest }) {
  const { isAuthenticated } = useSelector(state => state.user);
  
  const [isUserLoaded, setUserLoaded] = useState(false);
  
  const dispatch = useDispatch();
  
  // const init = async () => {
  //   const refreshToken = getCookie('refreshToken');
  //   if (refreshToken) {
  //     dispatch(getUserData(refreshToken));
  //   }
  //   setUserLoaded(true);
  // };
  
  // useEffect(() => {
  //   init();
  // }, []);

  // console.log(isUserLoaded);
  
  // if (!isUserLoaded) {
  //   return null;
  // }

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