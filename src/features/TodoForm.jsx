import { useRef } from 'react';
import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: block;
`;

const StyledButton = styled.button`
  &:disabled {
    font-style: italic;
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodoTitle, setWorkingTodo] = useState('');
  const todoTitleInput = useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodo('');
    todoTitleInput.current.focus();
  }

  return (
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodo(event.target.value)}
      />
      <StyledButton disabled={workingTodoTitle.trim().length === 0}>
        {isSaving ? 'Saving...' : 'Add todo'}
      </StyledButton>
    </StyledForm>
  );
}

export default TodoForm;
