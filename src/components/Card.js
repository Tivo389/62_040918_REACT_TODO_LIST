import React from 'react';
import update from 'immutability-helper';
import CardTask from './CardTask';
import CardName from './CardName';
import ColorPicker from './ColorPicker';

class Card extends React.Component {

  handleInput = (e) => {
    const {cardIndex, cardDetails, updateCard, updateState} = this.props;
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
    const nodesAll = e.currentTarget.childNodes;
    const nodeC = window.getSelection().anchorNode;
    const nodeCIndex = Array.from(nodesAll).indexOf(nodeC);
    const caretCIndex = window.getSelection().anchorOffset;
    const caretPosition = [nodeCIndex, caretCIndex];
    return caretPosition;
  };

  addTask = (e) => {
    const {cardIndex, cardDetails, updateCard, updateLastState} = this.props;
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
    updateLastState(cardIndex, newTask);
    updateCard(cardIndex, updatedCard);
  };

  restoreTextAsHTML = (cardProperty, cardIndex, cardDetails, lastCaretPosition) => {
    // const targetCard = document.querySelector(`div[data-name=${cardIndex}]`);
    // if( cardProperty.dataset.name.includes('task') ) {
    //   const tasksContainer = targetCard.querySelector('ul[data-name="cardTasks"]');
    //   for (let key in cardDetails.cardTasks) {
    //     const task = tasksContainer.querySelector(`span[data-name="${key}"]`);
    //     task.innerText = cardDetails.cardTasks[key].taskText;
    //   }
    //   return cardProperty.childNodes[lastCaretPosition[0]];
    // }
    // cardProperty.innerText = cardDetails.cardName;
    // return cardProperty.firstChild;
  };

  restoreCaretPosition = (cardProperty, textNode, lastCaretPosition) => {
    // if( textNode === null || textNode === undefined ) { cardProperty.focus() }
    // const range = document.createRange();
    // const sel = window.getSelection();
    // range.setStart(textNode, lastCaretPosition[1]);
    // range.setEnd(textNode, lastCaretPosition[1]);
    // sel.removeAllRanges();
    // sel.addRange(range);
  };

  componentDidUpdate(e) {
    const { cardIndex, cardDetails, lastCard, lastProperty, lastCaretPosition } = this.props;
    const lastCardExists = lastCard !== '';
    const sameAsLastCard = e.cardIndex === lastCard;
    const isInput = lastProperty.includes('task') || lastProperty.includes('cardName');
    if( lastCardExists && sameAsLastCard && isInput ) {
      const cardName = document.querySelector(`[data-name=${lastCard}]`);
      const cardProperty = cardName.querySelector(`[data-name=${lastProperty}]`);
      if(cardProperty != null) {
        debugger;
        // const textNode = this.restoreTextAsHTML(cardProperty, cardIndex, cardDetails, lastCaretPosition);
        // this.restoreCaretPosition(cardProperty, textNode, lastCaretPosition);
      }
    }
  }

  render() {
    const {cardIndex, cardDetails, updateCard, deleteCard, updateLastState} = this.props;
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
              updateCard={updateCard}
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
            updateCard={updateCard}
            updateLastState={updateLastState}
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