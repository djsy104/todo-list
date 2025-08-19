import { useRef } from 'react';
import { useState } from 'react';
import TextInputWithLabels from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodo] = useState('');
  const todoTitleInput = useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodo('');
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodo(event.target.value)}
      />
      <button disabled={workingTodoTitle.trim().length === 0}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
