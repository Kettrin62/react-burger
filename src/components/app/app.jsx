import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorBoundary from '../error-boundary/error-boundary';
import { IngredientsContext } from '../../services/ingredients-context';

const BASEURL= 'https://norma.nomoreparties.space/api';


function App() {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = () => {
      fetch(`${BASEURL}/ingredients`)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.statusText}`);
        })
        .then((data) => setData(data.data))
        .catch((err) => console.log(err));
    };
    getData();
  }, []);

  return (
    <ErrorBoundary>
      <div className={appStyles.app}>
        <AppHeader />
        <IngredientsContext.Provider value={data}>
        <main className={appStyles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
        </IngredientsContext.Provider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
