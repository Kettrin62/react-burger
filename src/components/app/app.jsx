import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile';
import { NotFound404 } from '../../pages/not-found';
import ErrorBoundary from '../error-boundary/error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getCookie } from '../../utils/functions';
import { IngredientPage } from '../../pages/ingredient';
import { getUserData } from '../../services/actions/user';
import { OrderFeedPage } from '../../pages/order-feed';
import { OrderInfoPage } from '../../pages/order-info';
import { WS_CONNECTION_FINISH, WS_CONNECTION_START } from '../../services/actions/ws';


function App() {
  const { orders, total, totalToday } = useSelector(state => state.ws);
  // console.log(orders);


  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );



  const initUser = () => {
    const refreshToken = getCookie('refreshToken');
    if (refreshToken && (refreshToken !== 'null')) {
      dispatch(getUserData(refreshToken));
    };
  };

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_FINISH });
    }
  }, [dispatch])


  return (
    <ErrorBoundary>
      <div className={appStyles.app}>
        <Router>
          <AppHeader />
          <Switch>
            <Route path='/' exact={true}>
              <HomePage />
            </Route>
            <Route path='/feed' exact={true}>
              <OrderFeedPage />
            </Route>
            <Route path='/login' exact={true}>
              <LoginPage />
            </Route>
            <Route path='/register' exact={true}>
              <RegisterPage />
            </Route>
            <Route path='/forgot-password' exact={true}>
              <ForgotPasswordPage />
            </Route>
            <Route path='/reset-password' exact={true}>
              <ResetPasswordPage />
            </Route>
            <ProtectedRoute path='/profile' exact={true}>
              <ProfilePage />
            </ProtectedRoute>
            <Route path='/ingredients/:id' exact={true}>
              <IngredientPage />
            </Route>
            <Route path='/feed/:id' exact={true}>
              <OrderInfoPage />
            </Route>
            <Route>
              <NotFound404 />
            </Route>
          </Switch>
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
