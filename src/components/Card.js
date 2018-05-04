import React from 'react';
import CardTask from './CardTask';
import CardName from './CardName';
import ColorPicker from './ColorPicker';

class Card extends React.Component {

  handleInput = (e) => {
    const {cardIndex, cardDetails, updateCard, updateLastState} = this.props;
    const property = e.currentTarget.dataset.name;
    const caret = this.getCaretPos(e);
    const updatedCard = {...cardDetails};

    if(property.includes('task')) {
      // CONTINUE HERE. JUST FINISHED THIS CHECK OTHER AREAS.
      // VERSION 4 : [IT WORKS!!!!!]
      const updatedTask = {...cardDetails.cardTasks[property]};
      updatedTask.taskName = e.currentTarget.textContent;
      const updatedTasks = {...cardDetails.cardTasks};
      updatedTasks[property] = updatedTask;
      updatedCard.cardTasks = updatedTasks;
      // VERSION 3 : [NO => AFFECTS SAMPLE]
      // This DOES NOT affect the sample, but it needs to go one tier deeper.
      // updatedTasks[property] = e.currentTarget.textContent;
      // This DOES affect the sample.
      // updatedTasks[property].taskName = e.currentTarget.textContent;
      // VERSION 2 : It works but should I copy all the cardTasks first?
      // const updatedTask = {...cardDetails.cardTasks[property]};
      // updatedTask.taskName = e.currentTarget.textContent;
      // VERSION 1 : [NO => AFFECTS SAMPLE]
      // updatedCard.cardTasks[property].taskName = e.currentTarget.textContent;
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

  componentDidUpdate() {
    if(this.props.lastCard !== '') {
      const cardName = document.querySelector(`[data-name=${this.props.lastCard}]`);
      const cardProperty = cardName.querySelector(`[data-name=${this.props.lastInput}]`);
      const textNode = cardProperty.firstChild;
      if(textNode != null) {
        const caret = this.props.lastCaretPosition;
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
    const {cardIndex, cardDetails, updateCard, deleteCard} = this.props;
    const divStyle = { backgroundColor: cardDetails.cardColor };
    return(
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
              handleInput={this.handleInput}
              updateCard={updateCard}
            />
          ))}
        </ul>
        <div className="cardToolBox">
          <ColorPicker
            name="cardColor"
            cardIndex={cardIndex}
            cardDetails={cardDetails}
            updateCard={updateCard}
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