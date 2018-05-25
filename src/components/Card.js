import React from 'react';
import update from 'immutability-helper';
import CardTask from './CardTask';
import CardName from './CardName';
import ColorPicker from './ColorPicker';

class Card extends React.Component {

  handleInput = (e) => {
    const {cardIndex, cardDetails, updateState} = this.props;
    const caretPosition = this.getCaretPos(e);
    const propertyMain = e.currentTarget.dataset.name;
    const propertySub = e.currentTarget.dataset.type;
    let updatedCard = {...cardDetails};
    if (propertySub === 'taskText') {
      updatedCard = update(updatedCard, {                         //01. Update 'updatedCard's...
        cardTasks: {                                              //02. 'cardTasks'...
          [propertyMain]: {                                       //03. propertyMain = current 'task'
            $merge: { [propertySub]: e.currentTarget.innerText }  //04. Merge this object with the data-structure
          }
        }
      });
    } else if (propertyMain === 'cardName' && propertySub === 'cardName') {
      updatedCard = update(updatedCard, {
        $merge: { [propertyMain]: e.currentTarget.innerText }
      });
    }
    updateState(updatedCard, cardIndex, propertyMain, caretPosition);
  };

  handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      const taskIndex = e.currentTarget.dataset.name;
      this.addTask(e, taskIndex);
    } else {
      return;
    }
  };

  getCaretPos = (e) => {
    const allNodes = e.currentTarget.childNodes;
    if (allNodes.length > 1) { return allNodes[0].length + 1 }
    return window.getSelection().anchorOffset;
  };

  addTask = (e, taskIndex) => {
    const {cardIndex, cardDetails, updateState} = this.props;
    const length = Object.keys(cardDetails.cardTasks).length;
    let updatedCard = {...cardDetails};
    let newTask;
    if(taskIndex) {
      // If there is a taskIndex. The enter key was pressed.
      newTask = `${taskIndex}${Date.now()}`;
    } else {
      // If I added it manually, taskIndex is undefined.
      newTask = `task${length}${Date.now()}`;
    }
    // Merge the newTask-key with object-value to the duplicated card.
    updatedCard = update(updatedCard, {
      cardTasks: {
        $merge: {
          [newTask]: { taskText:'', taskDone:"false" }
        }
      }
    });
    // Sort the cardTasks-object based on their key
    const orderedTasks = {};
    let newTaskSorted = false;
    Object.keys(updatedCard.cardTasks).sort().forEach((key,i) => {
      // When you are handling the newTask, update it's value so the integer is clean.
      if(!newTaskSorted && (key === newTask)) {
        newTask = `task${i}`;
        newTaskSorted = !newTaskSorted;
      }
      orderedTasks[`task${i}`] = updatedCard.cardTasks[key];
    });
    // Merge the sorted-cardTasks-Object to the duplicated card.
    updatedCard = update(updatedCard, {
      $merge: {
        cardTasks: orderedTasks
      }
    });
    updateState(updatedCard, cardIndex, newTask);
  };

  restoreCaretPosition = (cardProperty, lastCaretPosition) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(cardProperty.firstChild, lastCaretPosition);
    range.setEnd(cardProperty.firstChild, lastCaretPosition);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  componentDidUpdate(e) {
    const {lastCard, lastProperty, lastCaretPosition} = this.props;
    const lastCardExists = lastCard !== '';
    const sameAsLastCard = e.cardIndex === lastCard;
    const isInput = lastProperty.includes('task') || lastProperty.includes('cardName');
    if (lastCardExists && sameAsLastCard && isInput) {
      const cardName = document.querySelector(`[data-name=${lastCard}]`);
      const cardProperty = cardName.querySelector(`[data-name=${lastProperty}]`);
      if (cardProperty === null) {
        return;
      } else if (cardProperty.firstChild === null) {
        return cardProperty.focus();
      }
      this.restoreCaretPosition(cardProperty, lastCaretPosition);
    }
  }

  render() {
    const {cardIndex, cardDetails, deleteCard, updateState} = this.props;
    const divStyle = { backgroundColor: cardDetails.cardColor };
    return (
      <div className="cardContainer" data-name={cardIndex} style={divStyle}>
        <CardName
          name="cardName"
          cardDetails={cardDetails}
          handleInput={this.handleInput}
        />
        <ul data-name="cardTasks">
          {Object.keys(cardDetails.cardTasks).map(key => (
            <CardTask
              name="cardTasks"
              key={key}
              taskIndex={key}
              cardIndex={cardIndex}
              cardDetails={cardDetails}
              updateState={updateState}
              handleKeyDown={this.handleKeyDown}
              handleInput={this.handleInput}
            />
          ))}
          <li>
            <span role="button"
              data-name="addTaskBtn"
              onClick={this.addTask}>
              <span>+</span>
              <span>Add Task</span>
            </span>
          </li>
        </ul>
        <div className="cardToolBox">
          <ColorPicker
            name="cardColor"
            cardIndex={cardIndex}
            cardDetails={cardDetails}
            updateState={updateState}
          />
          <span onClick={() => deleteCard(cardIndex)}>
            <i className="fas fa-trash-alt"></i>
          </span>
        </div>
      </div>
    );
  }

}

export default Card;