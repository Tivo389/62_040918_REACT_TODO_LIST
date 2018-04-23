import React from 'react';
import CardTask from './CardTask';
import CardName from './CardName';

class Card extends React.Component {

  render() {
    const {cardName, cardColor, cardTasks} = this.props.cardDetails;
    const {cardDetails, cardIndex, updateCard} = this.props;
    const divStyle = { backgroundColor: cardColor };
    return(
      <div className="cardContainer" style={divStyle}>

        <CardName name="cardName" cardName={cardName} />
        <ul>
          {Object.keys(cardTasks).map(key => (
            <CardTask
              name="cardTasks"
              key={key}
              taskIndex={key}
              cardIndex={cardIndex}
              cardDetails={cardDetails}
              updateCard={updateCard} />
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