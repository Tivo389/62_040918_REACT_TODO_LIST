import React from 'react';
import Task from './Task';

class TaskCard extends React.Component {

  updateCardTitle() {
    console.log('------------!');
  }

  render() {
    const {name,color,tasks} = this.props.details;
    const divStyle = { backgroundColor: color };
    return(
      <div className="cardContainer" style={divStyle}>
        <h6 contentEditable="true" onInput={this.updateCardTitle}>{name}</h6>
        <ul>
          {Object.keys(tasks).map(key => (
            <Task key={key} cardIndex={this.props.cardIndex} taskIndex={key} taskDetail={tasks[key]} updateTask={this.props.updateTask} />
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