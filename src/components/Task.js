import React from 'react';

class Task extends React.Component {

  handleCheckbox = (e) => {
    const {classList, attributes} = e.currentTarget;
    const {taskDetail, updateCard, cardIndex, taskIndex} = this.props;
    const isChecked = attributes['aria-checked'].value === 'true';
    if(isChecked) {
      classList.remove('checked');
      attributes['aria-checked'].value = 'false';
    } else {
      classList.add('checked');
      attributes['aria-checked'].value = 'true';
    }
    const updatedTask = {
      ...taskDetail,
      taskDone: attributes['aria-checked'].value
    };
    updateCard(cardIndex, taskIndex, updatedTask);
  }

  render() {
    const {taskDone, taskName} = this.props.taskDetail;
    const taskIsDone = taskDone === 'true';
    if(taskIsDone) { return(
      <li>
        <div name="taskDone" className="checked" onClick={this.handleCheckbox} role="checkbox" aria-checked={taskDone}></div>
        <span name="taskName">{taskName}</span>
      </li>
    )} else { return(
      <li>
        <div name="taskDone" role="checkbox" onClick={this.handleCheckbox} aria-checked={taskDone}></div>
        <span name="taskName">{taskName}</span>
      </li>
    )}
  }

}

export default Task;