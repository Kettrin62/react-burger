import homeStyles from './home.module.css';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function HomePage() {

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={homeStyles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
}

export default HomePage;
