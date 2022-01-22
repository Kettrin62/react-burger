import React from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorBoundary from '../error-boundary/error-boundary';

const url= 'https://norma.nomoreparties.space/api/ingredients';


function App() {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = () => {
      fetch(url)
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
      <div className='app'>
        <AppHeader />
        <main className='main'>
          <BurgerIngredients ingredients={data}/>
          <BurgerConstructor ingredients={data} />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
