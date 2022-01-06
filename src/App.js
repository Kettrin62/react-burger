import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/appheader/appheader';
import BurgerIngredients from './components/burgeringredients/burgeringredients';

function App() {
  return (
    <div className="App">
      
      <AppHeader />
      <BurgerIngredients />
    </div>
  );
}

export default App;


// import React from "react";
// import appStyle from "./app.module.css";
// import Header from "../appHeader/appHeader";
// import BurgerIngredients from "../burgerIngredients/burgerIngredients";
// import BurgerConstructor from "../burgerConstructor/burgerConstructor";

// export default class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <Header></Header>
//         <main className={appStyle.main}>
//           <BurgerIngredients />
//           <BurgerConstructor />
//         </main>
//       </div>
//     );
//   }
// }