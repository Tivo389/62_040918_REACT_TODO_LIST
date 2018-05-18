import React from 'react';
import update from 'immutability-helper';

class CardTask extends React.Component {

  handleCheckbox = (e) => {
    const {cardDetails, taskIndex, cardIndex, updateCard} = this.props;
    const {classList, attributes} = e.currentTarget;
    const taskDetail = cardDetails.cardTasks[taskIndex];
    let isChecked = attributes['aria-checked'].value === 'true';
    classList.toggle('checked');
    isChecked = !isChecked;
    attributes['aria-checked'].value = isChecked;
    taskDetail.taskDone = isChecked;
    const updatedCard = {...cardDetails};
    updateCard(cardIndex, updatedCard);
  };

  deleteTask = () => {
    const {cardDetails, taskIndex, cardIndex, updateCard} = this.props;
    let updatedCard = {...cardDetails};
    updatedCard = update(updatedCard, {
      cardTasks: {
        $unset: [taskIndex]
      }
    });
    updateCard(cardIndex, updatedCard);
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
            aria-checked={taskDone}>
          </div>
          <span
            data-name={taskIndex}>
            <div>{taskText}</div>
          </span>
          <span
            data-name="delete"
            role="button"
            onClick={this.deleteTask}>
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
            aria-checked={taskDone}>
          </div>
          <span
            data-name={taskIndex}
            contentEditable="true"
            onKeyDown={handleKeyDown}
            onInput={handleInput}>
            <div>{taskText}</div>
          </span>
          <span
            data-name="delete"
            role="button"
            onClick={this.deleteTask}>
            <i className="fas fa-times-circle"></i>
          </span>
        </li>
      )
    }
  }

}

export default CardTask;