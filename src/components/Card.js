import React from 'react';
import CardTask from './CardTask';
import CardName from './CardName';

class Card extends React.Component {

  handleInput = (e) => {
    const {cardIndex, cardDetails, updateCard, updateLastCard} = this.props;
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
    updateLastCard(cardIndex);
    updateCard(cardIndex, updatedCard);
  };

  componentDidUpdate() {
    // CONTINUE HERE
    // Currently it updates from the header but it needs to know what it was adjusting last.
    // Might have to make a new state last Property?
    const cardName = document.querySelector(`[data-name=${this.props.lastCard}] h6`);
    const textNode = cardName.firstChild;
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
    const {cardIndex, cardDetails, lastCard, updateCard, updateLastCard} = this.props;
    const divStyle = { backgroundColor: cardDetails.cardColor };
    return(
      <div className="cardContainer" data-name={cardIndex} style={divStyle}>

        <CardName
          name="cardName"
          cardDetails={cardDetails}
          lastCard={lastCard}
          handleInput={this.handleInput}
          updateCard={updateCard}
          updateLastCard={updateLastCard}
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