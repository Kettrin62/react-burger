import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorBoundary from '../error-boundary/error-boundary';

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
        <main className={appStyles.main}>
          <BurgerIngredients ingredients={data}/>
          <BurgerConstructor ingredients={data} />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
