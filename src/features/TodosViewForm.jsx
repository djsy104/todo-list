import { useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from './TodosViewForm.module.css';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  min-height: 20vh;
`;

const StyledButton = styled.button`
  padding: 0.5rem;
`;

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => setQueryString(localQueryString), 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  function preventRefresh(event) {
    event.preventDefault();
  }
  return (
    <>
      <StyledForm onSubmit={preventRefresh}>
        <div>
          <label>Search todos:</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={localQueryString}
              onChange={(e) => {
                setLocalQueryString(e.target.value);
              }}
            />
            <StyledButton
              type="button"
              onClick={() => {
                setLocalQueryString('');
              }}
            >
              Clear
            </StyledButton>
          </div>
        </div>
        <div>
          <label htmlFor="sort-select">Sort by:</label>
          <select
            onChange={(e) => {
              setSortField(e.target.value);
            }}
            value={sortField}
            id="sort-select"
          >
            <option value="title">Title</option>
            <option value="createdTime">Time added</option>
          </select>
        </div>
        <div>
          <label htmlFor="direction-select">Direction:</label>
          <select
            onChange={(e) => {
              setSortDirection(e.target.value);
            }}
            value={sortDirection}
            id="direction-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </StyledForm>
    </>
  );
}

export default TodosViewForm;
