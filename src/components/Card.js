import React from 'react';
import update from 'immutability-helper';
import CardTask from './CardTask';
import CardName from './CardName';
import ColorPicker from './ColorPicker';

class Card extends React.Component {

  handleInput = (e) => {
    const {cardIndex, cardDetails, updateState} = this.props;
    const caretPosition = this.getCaretPos(e);
    const property = e.currentTarget.dataset.name;
    let updatedCard = {...cardDetails};
    if(property.includes('task')) {
      updatedCard = update(updatedCard, {                   //01. Update 'updatedCard's...
        cardTasks: {                                        //02. 'cardTasks'...
          [property]: {                                     //03. property = current 'task'
            $merge: { taskText:e.currentTarget.innerText }  //04. Merge this object with the data-structure
          }
        }
      });
    }
    updateState(updatedCard, cardIndex, property, caretPosition);
  };

  getCaretPos = (e) => {
    const allNodes = e.currentTarget.childNodes;
    if (allNodes.length > 1) { return allNodes[0].length + 1 }
    return window.getSelection().anchorOffset;
  };

  addTask = (e) => {
    const {cardIndex, cardDetails, updateState} = this.props;
    const length = Object.keys(cardDetails.cardTasks).length;
    const newTask = `task${length}${Date.now()}`;
    let updatedCard = {...cardDetails};
    updatedCard = update(updatedCard, {
      cardTasks: {
        $merge: {
          [newTask]: { taskDone:"false", taskText:'' }
        }
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
      if (cardProperty.firstChild === null) { return cardProperty.focus() };
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