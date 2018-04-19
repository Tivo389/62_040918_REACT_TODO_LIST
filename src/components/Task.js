import React from 'react';

class Task extends React.Component {

  handleCheckbox = (e) => {
    let isChecked = e.target.attributes['aria-checked'].value === 'true';
    if(isChecked) {
      e.target.classList.remove('checked');
      e.target.attributes['aria-checked'].value = 'false';
    } else {
      e.target.classList.add('checked');
      e.target.attributes['aria-checked'].value = 'true';
    }
    const updatedTask = {
      ...this.props.taskDetail,
      done: e.target.attributes['aria-checked'].value
    };

    // CONTINUE HERE USE DESTRUCTURE to DEAL WITH THE NAMES
    this.props.updateTask(this.props.cardIndex,this.props.taskIndex,updatedTask);
  }

  render() {
    const taskIsDone = this.props.taskDetail.done === 'true';
    if(taskIsDone) { return(
      <li>
        <div className="checked" onClick={this.handleCheckbox} role="checkbox" aria-checked={this.props.taskDetail.done}></div>
        <span>{this.props.taskDetail.name}</span>
      </li>
    )} else { return(
      <li>
        <div role="checkbox" onClick={this.handleCheckbox} aria-checked={this.props.taskDetail.done}></div>
        <span>{this.props.taskDetail.name}</span>
      </li>
    )}
  }

}

export default Task;