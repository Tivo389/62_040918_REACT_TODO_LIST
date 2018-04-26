import React from 'react';

class CardTask extends React.Component {

  handleCheckbox = (e) => {
    const {cardDetails, taskIndex, cardIndex, updateCard} = this.props;
    const {classList, attributes} = e.currentTarget;
    const taskDetail = cardDetails.cardTasks[taskIndex];
    const isChecked = attributes['aria-checked'].value === 'true';
    if(isChecked) {
      classList.remove('checked');
      attributes['aria-checked'].value = 'false';
      taskDetail.taskDone = attributes['aria-checked'].value;
    } else {
      classList.add('checked');
      attributes['aria-checked'].value = 'true';
      taskDetail.taskDone = attributes['aria-checked'].value;
    }
    const updatedCard = {
      ...cardDetails
    };
    updateCard(cardIndex, updatedCard);
  };

  render() {
    const {cardDetails, taskIndex, handleInput} = this.props;
    const taskDetail = cardDetails.cardTasks[taskIndex];
    const {taskDone, taskName} = taskDetail;
    const taskIsDone = taskDone === 'true';
    if(taskIsDone) {
      return(
        <li>
          <div
            className="checked"
            onClick={this.handleCheckbox}
            role="checkbox"
            aria-checked={taskDone}>
          </div>
          <span
            data-name={taskIndex}>
            {taskName}
          </span>
        </li>
      )
    } else {
      return(
        <li>
          <div
            role="checkbox"
            onClick={this.handleCheckbox}
            aria-checked={taskDone}>
          </div>
          <span
            data-name={taskIndex}
            contentEditable="true"
            onInput={handleInput}>
            {taskName}
          </span>
        </li>
      )
    }
  }

}

export default CardTask;