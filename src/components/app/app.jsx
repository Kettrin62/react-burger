import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorBoundary from '../error-boundary/error-boundary';


function App() {

  return (
    <ErrorBoundary>
      <div className={appStyles.app}>
        <AppHeader />
          <main className={appStyles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
