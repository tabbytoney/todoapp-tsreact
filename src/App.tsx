import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');

  // state to contain all todos to show as list
  const [todos, setTodos] = useState<Todo[]>([]);

  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  // for when user clicks on add button
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      // ...todos includes all the previous todos, between the {} is the data needed to be added
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      // empty the input field after submission
      setTodo('');
    }
  };

  console.log(todos);
  return (
    <DragDropContext onDragEnd={() => console.log('hi')}>
      <div className='App'>
        <span className='heading'>To Do</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
