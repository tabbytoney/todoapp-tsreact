import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/model';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');

  // state to contain all todos to show as list
  const [todos, setTodos] = useState<Todo[]>([]);

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
    <div className='App'>
      <span className='heading'>To Do</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {todos.map((t) => (
        <li key={t.todo}>{t.todo}</li>
      ))}
    </div>
  );
};

export default App;
