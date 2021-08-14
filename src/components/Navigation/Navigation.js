import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav>
      <NavLink
        exact
        className={styles.link}
        activeClassName={styles.active}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={styles.link}
        activeClassName={styles.active}
        to="/movies"
      >
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
