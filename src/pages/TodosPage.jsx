import TodoList from '../features/TodoList/TodoList';
import TodoForm from '../features/TodoForm';
import TodosViewForm from '../features/TodosViewForm';
import { useNavigate, useSearchParams } from 'react-router';
import styles from './TodosPage.module.css';
import { useEffect } from 'react';

function TodosPage({
  onAddTodo,
  onCompleteTodo,
  onUpdateTodo,
  todoList,
  isSaving,
  isLoading,
  sortDirection,
  sortField,
  queryString,
  setSortDirection,
  setSortField,
  setQueryString,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const indexOfLastTodo = indexOfFirstTodo + itemsPerPage;
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
  const currentTodos = filteredTodoList.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  function handlePreviousPage() {
    if (currentPage > 1) {
      setSearchParams({ page: (currentPage - 1).toString() });
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setSearchParams({ page: (currentPage + 1).toString() });
    }
  }

  return (
    <>
      <TodoForm onAddTodo={onAddTodo} isSaving={isSaving} />

      <TodoList
        todoList={currentTodos}
        onCompleteTodo={onCompleteTodo}
        onUpdateTodo={onUpdateTodo}
        isLoading={isLoading}
        isSaving={isSaving}
      />

      {totalPages > 1 && (
        <div className={styles.paginationControls}>
          <button
            className={styles.paginationBtn}
            onClick={() => handlePreviousPage()}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={styles.paginationBtn}
            onClick={() => handleNextPage()}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </>
  );
}

export default TodosPage;
