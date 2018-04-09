import React from 'react';
import ReactDOM from 'react-dom';

class TodoList extends React.Component {
  render() {
    return(
      <div>
        <p>Title of List</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      </div>
    );
  }
}

export default TodoList;