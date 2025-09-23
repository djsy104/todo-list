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

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'fetchTodos':
      return { ...state };

    case 'loadTodos':
      return { ...state };

    case 'startRequest':
      return { ...state };

    case 'addTodo':
      return { ...state };

    case 'endRequest':
      return { ...state };

    case 'completeTodo':
      return { ...state };

    case 'updateTodo':
      return { ...state };

    case 'revertTodo':
      return { ...state };

    case 'setLoadError':
      return { ...state };

    case 'clearError':
      return { ...state };
  }
}

export { initialState, actions };
