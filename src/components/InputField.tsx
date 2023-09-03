import React from 'react';
import './styles.css';

const InputField = () => {
  return (
    <form className='input'>
      <input type='input' placeholder='Add a task' className='input_box' />
      <button className='input_submit' type='submit'>
        Add
      </button>
    </form>
  );
};

export default InputField;
