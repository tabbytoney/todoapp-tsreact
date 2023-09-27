import React from 'react';
import './styles.css';
import { Todo } from './model';
import TodoCard from './TodoCard';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className='container'>
      <div className='todos'>
        <span className='todos_heading'>Active Tasks</span>
        {todos.map((todo) => (
          <TodoCard
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
      <div className='todos remove'>
        <span className='todos_heading'>Completed Tasks</span>
        {todos.map((todo) => (
          <TodoCard
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
