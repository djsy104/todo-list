import { NavLink } from 'react-router';
import todoLogo from '../assets/checklist.svg';
import styled from 'styled-components';
import styles from './Header.module.css';

const StyledLogo = styled.img`
  width: 3rem;
  height: 3rem;
`;

function Header({ title }) {
  return (
    <>
      <h1 className={styles.title}>
        {title}
        {title == 'Todo List' && (
          <StyledLogo src={todoLogo} alt="checklist icon" />
        )}
      </h1>
      <nav>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Home
        </NavLink>
        <NavLink
          to={'/about'}
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          About
        </NavLink>
      </nav>
    </>
  );
}

export default Header;
