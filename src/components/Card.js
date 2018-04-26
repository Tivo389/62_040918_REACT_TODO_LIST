import React from 'react';
import CardTask from './CardTask';
import CardName from './CardName';

class Card extends React.Component {

  handleInput = (e) => {
    const {cardIndex, cardDetails, updateCard, updateLastState} = this.props;
    const property = e.currentTarget.dataset.name;
    if(property.includes('task')) {
      const task = {...cardDetails.cardTasks};
      task[property].taskName = e.currentTarget.textContent;
    } else {
      cardDetails[property] = e.currentTarget.textContent;
    }
    const updatedCard = {
      ...cardDetails
    };
    updateLastState(cardIndex, property);
    updateCard(cardIndex, updatedCard);
  };

  componentDidUpdate() {
    const cardName = document.querySelector(`[data-name=${this.props.lastCard}]`);
    const cardProperty = cardName.querySelector(`[data-name=${this.props.lastProperty}]`);
    const textNode = cardProperty.firstChild;
    if(textNode != null) {
      const caret = textNode.length;
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
          <i className="fas fa-paint-brush"></i>
          <i className="fas fa-trash-alt"></i>
        </div>
      </div>
    );
  }

}

export default Card;