import React from 'react';
import CardTitle from './CardTitle';

class TodoList extends React.Component {

  render() {
    return(
      <div className="cardContainer">
        <CardTitle />
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
        <div className="cardToolBox">
          <i className="fas fa-paint-brush"></i>
          <i className="fas fa-trash-alt"></i>
        </div>
      </div>
    );
  }
}

export default TodoList;