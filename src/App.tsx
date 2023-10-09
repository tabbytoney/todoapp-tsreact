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

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    // if the destination is the same as the source (still in the todo box), do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === 'TodosList') {
      // remove from todo list
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      // remove from completed list
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      // add to todo list. 0 means do not remove anything, add to the index
      active.splice(destination.index, 0, add);
    } else {
      // add to completed list
      complete.splice(destination.index, 0, add);
    }
    // add what we added to the state
    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
