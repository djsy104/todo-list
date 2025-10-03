import { useNavigate } from 'react-router';
import styles from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p>Page not found</p>
      <button className={styles.homeBtn} onClick={() => navigate('/')}>
        Home
      </button>
    </div>
  );
}

export default NotFound;
