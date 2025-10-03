import styles from './About.module.css';

function About() {
  return (
    <div className={styles.container}>
      <p>
        This Todo application was developed as a project to strengthen my
        understanding of React and modern front-end development practices. It
        highlights the use of React components to create a modular interface,
        state management with the useReducer hook, and side-effect handling
        through useEffect. The app integrates with Airtable’s API to persist and
        manage tasks, providing practical experience with asynchronous data
        fetching and error handling. Additional features such as sorting,
        filtering, and task updates demonstrate how React applications can scale
        in complexity while maintaining a clear structure. Routing with React
        Router was also implemented to support multiple views and improve
        navigation. This project reflects my ability to learn new technologies,
        apply best practices, and build functional, user-friendly web
        applications.
      </p>
    </div>
  );
}

export default About;
