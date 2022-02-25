import React, { useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorBoundary from '../error-boundary/error-boundary';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
        <DndProvider backend={HTML5Backend}>
          <main className={appStyles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
