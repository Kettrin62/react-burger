import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/appheader/appheader';
import BurgerIngredients from './components/burgeringredients/burgeringredients';
import BurgerConstructor from './components/burgerconstructor/burgerconstructor';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main style={{ display: 'flex' }}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
