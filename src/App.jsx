import { useState, useEffect, useCallback, useReducer } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';
import styles from './App.module.css';
import styled from 'styled-components';
import errorIcon from './assets/error.svg';
import todoLogo from './assets/checklist.svg';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

const apiRequest = async (endpoint, token, method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  };

  const resp = await fetch(endpoint, options);

  if (!resp.ok) {
    throw new Error(
      `Request failed with status ${resp.status}: ${resp.statusText}`
    );
  }

  return resp.json();
};

const StyledErrorIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const StyledLogo = styled.img`
  width: 3rem;
  height: 3rem;
`;

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${todoState.sortField}&sort[0][direction]=${todoState.sortDirection}`;
    let searchQuery = '';
    if (todoState.queryString) {
      searchQuery = `&filterByFormula=SEARCH("${todoState.queryString}",+title)`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [todoState.queryString, todoState.sortDirection, todoState.sortField]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      try {
        const { records } = await apiRequest(encodeUrl(), token);
        dispatch({ type: todoActions.loadTodos, records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      } finally {
        dispatch({ type: todoActions.endRequest });
      }
    };
    fetchTodos();
  }, [todoState.sortDirection, todoState.sortField, todoState.queryString]);

  async function addTodo(title) {
    const newTodo = {
      title: title,
      id: Date.now(),
      isCompleted: false,
    };

    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        throw new Error(
          `Request failed with status ${resp.status}: ${resp.statusText}`
        );
      }

      const { records } = await resp.json();
      dispatch({ type: todoActions.addTodo, records });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoState.todoList.find((todo) => todo.id === id);
    dispatch({ type: todoActions.completeTodo, id });

    const payload = {
      records: [
        {
          id,
          fields: {
            isCompleted: true,
          },
        },
      ],
    };

    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await apiRequest(encodeUrl(), token, 'PATCH', payload);
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
      dispatch({ type: todoActions.revertTodo, originalTodo });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );
    dispatch({ type: todoActions.updateTodo, editedTodo });

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await apiRequest(encodeUrl(), token, 'PATCH', payload);
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
      dispatch({ type: todoActions.revertTodo, originalTodo });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        My Todos <StyledLogo src={todoLogo} alt="checklist icon" />
      </h1>
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />

      <TodoList
        todoList={todoState.todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={todoState.isLoading}
        isSaving={todoState.isSaving}
      />
      <hr />
      <TodosViewForm
        sortDirection={todoState.sortDirection}
        setSortDirection={(direction) =>
          dispatch({ type: todoActions.setSortDirection, direction })
        }
        sortField={todoState.sortField}
        setSortField={(field) =>
          dispatch({ type: todoActions.setSortField, field })
        }
        queryString={todoState.queryString}
        setQueryString={(query) =>
          dispatch({ type: todoActions.setQueryString, query })
        }
      />
      {todoState.errorMessage && (
        <div className={styles.error}>
          <hr />
          <p className={styles.errorMessage}>
            <StyledErrorIcon src={errorIcon} alt="error icon" />
            {todoState.errorMessage}
          </p>
          <button onClick={() => dispatch({ type: todoActions.clearError })}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
