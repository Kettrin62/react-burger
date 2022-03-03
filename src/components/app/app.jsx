import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home';
import ErrorBoundary from '../error-boundary/error-boundary';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';


function App() {
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  return (
    <ErrorBoundary>
      <div className={appStyles.app}>
        <AppHeader />
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
