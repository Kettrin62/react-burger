import ConstructorList from '../constructor-list/constructor-list';
import burgerconstructorStyles from './burger-constructor.module.css';
import Total from '../total/total';


function BurgerConstructor() {

  return (
    <section className={'pl-5 pr-5 pt-25 ' + burgerconstructorStyles.section}>
      <ConstructorList />
      <Total />
    </section>
  )
}

export default BurgerConstructor;
