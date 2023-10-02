import React, { useEffect, useState } from 'react';
import { Todo } from './model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoCard = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [editTodo, setEditTodo] = React.useState<string>(todo.todo);

  const handleDone = (id: number) => {
    //  map through all todos, whatever id matches change to isDone
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
    console.log('done');
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  // when click edit, make cursor focus in the text input
  const inputRef = React.useRef<HTMLInputElement>(null);

  // whenever edit changes, it'll focus on the text input
  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);

  return (
    <form className='todos_single' onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className='todos_single--text'
        />
      ) : todo.isDone ? (
        <s className='todos_single--text'>{todo.todo}</s>
      ) : (
        <span className='todos_single--text'>{todo.todo}</span>
      )}

      <div>
        <span
          className='icon'
          onClick={() => {
            // can't edit a 'done' todo
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className='icon' onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className='icon' onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default TodoCard;
