import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

class CardTask extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    taskIndex: PropTypes.string,
    cardIndex: PropTypes.string,
    cardDetails: PropTypes.shape({
      cardName: PropTypes.string,
      cardColor: PropTypes.string,
      cardTasks: PropTypes.shape({
        task: PropTypes.shape({
          taskText: PropTypes.string,
          taskDone: PropTypes.string
        })
      })
    }),
    updateState: PropTypes.func,
    handleKeyDown: PropTypes.func,
    handleInput: PropTypes.func
  };

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
    const {cardDetails, taskIndex, cardIndex, updateState, deleteCard} = this.props;
    let updatedCard = {...cardDetails};
    // START / PRE-FIREBASE IMPLEMENTATION
    // updatedCard = update(updatedCard, {
    //   cardTasks: { $unset: [taskIndex] }
    // });
    // END / PRE-FIREBASE IMPLEMENTATION
    // START / POST-FIREBASE IMPLEMENTATION
    updatedCard = update(updatedCard, {
      cardTasks: { $merge: { [taskIndex]: null } }
    });
    // END / POST-FIREBASE IMPLEMENTATION
    const isLastTask = Object.keys(cardDetails.cardTasks).length === 1;
    isLastTask ? deleteCard(cardIndex) : updateState(updatedCard, cardIndex);
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