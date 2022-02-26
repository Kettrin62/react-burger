import navigationStyles from './navigation.module.css';

function Navigation(props) {
  return (
    <nav className={navigationStyles.nav}>
      {props.children}
    </nav>
  )
}

export default Navigation;