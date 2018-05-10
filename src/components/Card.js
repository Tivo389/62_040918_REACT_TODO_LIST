import React from 'react';
import update from 'immutability-helper';
import CardTask from './CardTask';
import CardName from './CardName';
import ColorPicker from './ColorPicker';

class Card extends React.Component {

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
            $merge: { taskName:e.currentTarget.textContent }  //04. Merge this object with the data-structure
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
      updatedCard[property] = e.currentTarget.textContent;
    }
    updateLastState(cardIndex, property, caret);
    updateCard(cardIndex, updatedCard);
  };

  getCaretPos = (e) => {
    const element = e.currentTarget;
    const doc = element.ownerDocument || element.document;
    const win = doc.defaultView || doc.parentWindow;
    let caretOffset = 0;
    let sel;
    if (typeof win.getSelection !== "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        const range = win.getSelection().getRangeAt(0);
        caretOffset = range.endOffset;
      }
    } else if ( (sel = doc.selection) && sel.type !== "Control" ) {
      const textRange = sel.createRange();
      const preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  };

  addTask = () => {
    console.log('addTask ACTIVATED!');
    // CONTINUE HERE look at how dom elemenets were added for wes version
    // Consider if delete task should be in this component as well.
  }

  componentDidUpdate() {
    const { lastCard, lastProperty, lastCaretPosition } = this.props;
    if(lastCard !== '' && (lastProperty.includes('task') || lastProperty.includes('cardName'))) {
      const cardName = document.querySelector(`[data-name=${lastCard}]`);
      const cardProperty = cardName.querySelector(`[data-name=${lastProperty}]`);
      const textNode = cardProperty.firstChild;
      if(textNode != null) {
        const caret = lastCaretPosition;
        const range = document.createRange();
        range.setStart(textNode, caret);
        range.setEnd(textNode, caret);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
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
        <ul>
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