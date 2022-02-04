import React from 'react';
import { BASEURL } from '../../utils/data';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorBoundary from '../error-boundary/error-boundary';
import { DataIngredientsContext, CardConstructorContext } from '../../services/app-context';


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
  
  const [card, setCard] = React.useState([
    '60d3b41abdacab0026a733c6',
    '60d3b41abdacab0026a733c8',
    '60d3b41abdacab0026a733c9',
    '60d3b41abdacab0026a733ca',
    '60d3b41abdacab0026a733cb',
    '60d3b41abdacab0026a733ce',
  ]);

  return (
    <ErrorBoundary>
      <div className={appStyles.app}>
        <AppHeader />
        <DataIngredientsContext.Provider value={data}>
          <CardConstructorContext.Provider value={card}>
            <main className={appStyles.main}>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>
          </CardConstructorContext.Provider>
        </DataIngredientsContext.Provider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
