import React from 'react';
import CardTask from './CardTask';
import CardName from './CardName';
import ColorPicker from './ColorPicker';

class Card extends React.Component {

  handleInput = (e) => {
    const {cardIndex, cardDetails, updateCard, updateLastState} = this.props;
    const property = e.currentTarget.dataset.name;
    const caret = this.getCaretPos(e);
    if(property.includes('task')) {
      const task = {...cardDetails.cardTasks};
      task[property].taskName = e.currentTarget.textContent;
    } else {
      cardDetails[property] = e.currentTarget.textContent;
    }
    const updatedCard = {
      ...cardDetails
    };
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
    const cardName = document.querySelector(`[data-name=${this.props.lastCard}]`) || '';
    const cardProperty = cardName.querySelector(`[data-name=${this.props.lastProperty}]`) || '';
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

  render() {
    const {cardIndex, cardDetails, lastCard, updateCard} = this.props;
    const divStyle = { backgroundColor: cardDetails.cardColor };
    return(
      <div className="cardContainer" data-name={cardIndex} style={divStyle}>
        <CardName
          name="cardName"
          cardDetails={cardDetails}
          lastCard={lastCard}
          handleInput={this.handleInput}
          updateCard={updateCard}
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
          <ColorPicker />
          <i className="fas fa-trash-alt"></i>
        </div>
      </div>
    );
  }

}

export default Card;