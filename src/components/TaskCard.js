import React from 'react';
import Task from './Task';

class TaskCard extends React.Component {

  render() {
    const {name,color,tasks} = this.props.details;
    const divStyle = { backgroundColor: color };

    return(
      <div className="cardContainer" style={divStyle}>
        <h6>{name}</h6>
        <ul>
          {Object.keys(tasks).map(key => (
            <Task key={key} taskDetail={tasks[key]} />
          ))}
        </ul>
        <div className="cardToolBox">
          <i className="fas fa-paint-brush"></i>
          <i className="fas fa-trash-alt"></i>
        </div>
      </div>
    );
  }

}

export default TaskCard;