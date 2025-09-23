const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',

  //actions found in addTodo
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',

  //actions found in todo helper functions
  completeTodo: 'completeTodo',
  updateTodo: 'updateTodo',

  //reverts todos when requests fail
  revertTodo: 'revertTodo',

  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',

  //action on 'Dismiss Error' button
  clearError: 'clearError',
};

const transformRecordToTodo = (record) => {
  const todo = {
    id: record.id,
    ...record.fields,
  };

  if (!todo.isCompleted) {
    todo.isCompleted = false;
  }

  return todo;
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };

    case actions.loadTodos:
      return {
        ...state,
        todoList: action.records.map(transformRecordToTodo),
        isLoading: false,
      };

    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };

    case actions.addTodo: {
      const savedTodo = transformRecordToTodo(action.records[0]);
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    }

    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };

    case actions.completeTodo: {
      const updatedTodos = state.todoList.map((todo) =>
        todo.id === action.id ? { ...todo, isCompleted: true } : todo
      );
      return {
        ...state,
        todoList: updatedTodos,
      };
    }

    // case actions.updateTodo: {
    //   const updatedTodos = state.todoList.map((todo) =>
    //     todo.id === action.editedTodo.id ? { ...action.editedTodo } : todo
    //   );

    //   const updatedState = {
    //     ...state,
    //     todoList: updatedTodos,
    //   };

    //   if (action.error) {
    //     updatedState.errorMessage = action.error.message;
    //   }

    //   return updatedState;
    // }
    case actions.updateTodo:
    case actions.revertTodo: {
      const targetTodo = action.editedTodo ?? action.originalTodo;

      const revertedTodos = state.todoList.map((todo) =>
        todo.id === targetTodo.id ? { ...targetTodo } : todo
      );

      const updatedState = {
        ...state,
        todoList: revertedTodos,
      };

      if (action.error) {
        updatedState.errorMessage = action.error.message;
      }

      return updatedState;
    }

    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };

    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };
  }
}

export { initialState, actions, reducer };
