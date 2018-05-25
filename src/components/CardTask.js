import React from 'react';
import update from 'immutability-helper';

class CardTask extends React.Component {

  handleCheckbox = (e) => {
    const {cardDetails, taskIndex, cardIndex, updateState} = this.props;
    const {classList, attributes} = e.currentTarget;
    let isChecked = attributes['aria-checked'].value === 'true';
    let updatedCard = {...cardDetails};
    classList.toggle('checked');
    isChecked = !isChecked;
    attributes['aria-checked'].value = isChecked;
    updatedCard = update(updatedCard, {
      cardTasks: {
        [taskIndex]: {
          $merge: { taskDone: String(isChecked) }
        }
      }
    });
    updateState(updatedCard, cardIndex);
  };

  deleteTask = () => {
    const {cardDetails, taskIndex, cardIndex, updateState} = this.props;
    let updatedCard = {...cardDetails};
    updatedCard = update(updatedCard, {
      cardTasks: { $unset: [taskIndex] }
    });
    updateState(updatedCard, cardIndex);
  };

  render() {
    const {cardDetails, taskIndex, handleKeyDown, handleInput} = this.props;
    const taskDetail = cardDetails.cardTasks[taskIndex];
    const {taskDone, taskText} = taskDetail;
    const taskIsDone = taskDone === 'true';
    if(taskIsDone) {
      return (
        <li data-name="cardTasks">
          <div
            className="checked"
            role="checkbox"
            onClick={this.handleCheckbox}
            aria-checked={taskDone} >
          </div>
          <span
            data-name={taskIndex}
            data-type="taskText" >
            {taskText}
          </span>
          <span
            data-name="delete"
            role="button"
            onClick={this.deleteTask} >
            <i className="fas fa-times-circle"></i>
          </span>
        </li>
      )
    } else {
      return(
        <li data-name="cardTasks">
          <div
            role="checkbox"
            onClick={this.handleCheckbox}
            aria-checked={taskDone} >
          </div>
          <span
            data-name={taskIndex}
            data-type="taskText"
            contentEditable="true"
            onKeyDown={handleKeyDown}
            onInput={handleInput} >
            {taskText}
          </span>
          <span
            data-name="delete"
            role="button"
            onClick={this.deleteTask} >
            <i className="fas fa-times-circle"></i>
          </span>
        </li>
      )
    }
  }

}

export default CardTask;