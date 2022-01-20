import React from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const url= 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  React.useEffect(() => {
    const getIngredients = () => {
      setState({ ...state, hasError: false, isLoading: true });
      fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(data => setState({ ...state, data: data.data, isLoading: false }))
        .catch(e => {
          setState({ ...state, hasError: true, isLoading: false });
        });
    };
    
    getIngredients();
  }, []);

  const { data, isLoading, hasError } = state;


  return (
    <div className='app'>
      <AppHeader />
      <main className='main'>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
      <ul>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
          !hasError &&
          data.length &&
          data.map((item, index) => (
            <li key={index}>
              {item.name} {item.price}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
