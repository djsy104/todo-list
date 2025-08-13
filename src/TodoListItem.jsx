function TodoListItem({ todo, onCompleteTodo }) {
  return (
    <li>
      <form>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onCompleteTodo(todo.id)}
        ></input>
        {todo.title}
      </form>
    </li>
  );
}

export default TodoListItem;
