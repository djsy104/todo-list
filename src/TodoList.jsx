import TodoListItem from './TodoListItem';

function TodoList({ todoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}

export default TodoList;
