import React from 'react';
import update from 'immutability-helper';
import CardTask from './CardTask';
import CardName from './CardName';
import ColorPicker from './ColorPicker';

class Card extends React.Component {

  handleKeyDown = (e) => {
    const isEnter = e.key === 'Enter';
    const isShift = e.shiftKey === true;
    if(isEnter && isShift) {
    } else if(isEnter) {
      e.preventDefault();
      const firstHalf = e.currentTarget.innerHTML.slice(0, window.getSelection().anchorOffset);
      const secondHalf = e.currentTarget.innerHTML.slice(window.getSelection().anchorOffset, e.currentTarget.innerHTML.length);
      const caretAtStart = firstHalf.length === 0;
      const caretInText = firstHalf.length > 0 && firstHalf.length < e.currentTarget.innerHTML.length;
      if(caretAtStart) {
        e.currentTarget.innerHTML = `<br>${firstHalf}${secondHalf}`;
      } else if(caretInText) {
        e.currentTarget.innerHTML = `${firstHalf}<br>${secondHalf}`;
      } else {
        if(e.currentTarget.childNodes.length > 1) {
          e.currentTarget.innerHTML = `${firstHalf}${secondHalf}<br>`;
        } else {
          e.currentTarget.innerHTML = `${firstHalf}${secondHalf}<br><br>`;
        }
      }
    }
    this.handleInput(e);
  };

  handleInput = (e) => {
    const {cardIndex, cardDetails, updateCard, updateLastState} = this.props;
    const property = e.currentTarget.dataset.name;
    const caret = this.getCaretPos(e);
    let updatedCard = {...cardDetails};
    if(property.includes('task')) {
      // WITH IMMUTABILITY HELPER
      updatedCard = update(updatedCard, {  //01. Update 'updatedCard's...
        cardTasks: {  //02. 'cardTasks'...
          [property]: {  //03. property = current 'task'
            $merge: { taskName:e.currentTarget.innerHTML }  //04. Merge this object with the data-structure
          }
        }
      });
      // WITHOUT IMMUTABILITY HELPER
      // const updatedTask = {...cardDetails.cardTasks[property]};  //01. Make copy of the 'task'
      // updatedTask.taskName = e.currentTarget.textContent;  //02. Reassign the 'taskName' in the 'task'
      // const updatedTasks = {...cardDetails.cardTasks};  //03. Make a copy of the 'task[S]'
      // updatedTasks[property] = updatedTask;  //04. Reassign the 'task' in the 'task[S]'
      // updatedCard.cardTasks = updatedTasks;  //05. Reassign the 'task[S]' in the 'card'
    } else {
      updatedCard[property] = e.currentTarget.innerHTML;
    }
    updateLastState(cardIndex, property, caret);
    updateCard(cardIndex, updatedCard);
  };

  getCaretPos = (e) => {
    const element = e.currentTarget;
    const allNodes = e.currentTarget.childNodes;
    const caretOffset = [0,0];
    const currentNode = window.getSelection().anchorNode;
    const currentNodeIndex = Array.from(allNodes).indexOf(currentNode);
    // CONTINUE HERE
    // We need to return the correct caret position with line-breaks.
    debugger;
    // If its a normal input of text then do...
    if(allNodes.length !== 0 && currentNodeIndex !== -1) {
      const doc = element.ownerDocument || element.document;
      const win = doc.defaultView || doc.parentWindow;
      caretOffset[0] = currentNodeIndex;
      let sel;
      if (typeof win.getSelection !== "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
          const range = win.getSelection().getRangeAt(0);
          caretOffset[1] = range.endOffset;
        }
      } else if ( (sel = doc.selection) && sel.type !== "Control" ) {
        const textRange = sel.createRange();
        const preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset[1] = preCaretTextRange.text.length;
      }
      return caretOffset;
    }
  };

  addTask = (e) => {
    const {cardIndex, cardDetails, updateCard, updateLastState} = this.props;
    const length = Object.keys(cardDetails.cardTasks).length;
    const newTask = `task${length}${Date.now()}`;
    let updatedCard = {...cardDetails};
    updatedCard = update(updatedCard, {
      cardTasks: {
        $merge: {
          [newTask]: { taskDone:"false", taskName:'' }
        }
      }
    });
    updateLastState(cardIndex, newTask);
    updateCard(cardIndex, updatedCard);
  };

  restoreTextAsHTML = (cardProperty, cardIndex, cardDetails, lastCaretPosition) => {
    const targetCard = document.querySelector(`div[data-name=${cardIndex}]`);
    if( cardProperty.dataset.name.includes('task') ) {
      const tasksContainer = targetCard.querySelector('ul[data-name="cardTasks"]');
      for (let key in cardDetails.cardTasks) {
        const task = tasksContainer.querySelector(`span[data-name="${key}"]`);
        task.innerHTML = cardDetails.cardTasks[key].taskName;
      }
      return cardProperty.childNodes[lastCaretPosition[0]];
    } else {
      cardProperty.innerHTML = cardDetails.cardName;
      return cardProperty.firstChild;
    }
  };

  restoreCaretPosition = (cardProperty, textNode, lastCaretPosition) => {
    if( textNode === null || textNode === undefined ) {
      cardProperty.focus(); // Add task => Focus on input
    } else {
      const range = document.createRange();
      range.setStart(textNode, lastCaretPosition[1]);
      range.setEnd(textNode, lastCaretPosition[1]);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  componentDidUpdate(e) {
    const { cardIndex, cardDetails, lastCard, lastProperty, lastCaretPosition } = this.props;
    const lastCardExists = lastCard !== '';
    const sameAsLastCard = e.cardIndex === lastCard;
    const isTaskOrName = lastProperty.includes('task') || lastProperty.includes('cardName');
    if( lastCardExists && sameAsLastCard && isTaskOrName ) {
      const cardName = document.querySelector(`[data-name=${lastCard}]`);
      const cardProperty = cardName.querySelector(`[data-name=${lastProperty}]`);
      if(cardProperty != null) {
        const textNode = this.restoreTextAsHTML(cardProperty, cardIndex, cardDetails, lastCaretPosition);
        this.restoreCaretPosition(cardProperty, textNode, lastCaretPosition);
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
          handleKeyDown={this.handleKeyDown}
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