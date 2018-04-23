import React from 'react';

class CardTask extends React.Component {

  handleCheckbox = (e) => {
    const {cardDetails, taskIndex, cardIndex, updateCard} = this.props;
    const taskDetail = cardDetails.cardTasks[taskIndex];
    const {classList, attributes} = e.currentTarget;
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
  }

  render() {
    const {cardDetails, taskIndex} = this.props;
    const taskDetail = cardDetails.cardTasks[taskIndex];
    const {taskDone, taskName} = taskDetail;
    const taskIsDone = taskDone === 'true';
    if(taskIsDone) {
      return(
        <li>
          <div
            name="taskDone"
            className="checked"
            onClick={this.handleCheckbox}
            role="checkbox"
            aria-checked={taskDone}>
          </div>
          <span name="taskName">{taskName}</span>
        </li>
      )
    } else {
      return(
        <li>
          <div
            name="taskDone"
            role="checkbox"
            onClick={this.handleCheckbox}
            aria-checked={taskDone}>
          </div>
          <span name="taskName">{taskName}</span>
        </li>
      )
    }
  }

}

export default CardTask;