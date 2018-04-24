import React from 'react';

class CardName extends React.Component {

  handleInput = (e) => {
    const {cardIndex, cardDetails, updateCard, updateLastCard} = this.props;
    cardDetails.cardName = e.currentTarget.textContent;
    const updatedCard = {
      ...cardDetails
    };
    updateLastCard(cardIndex);
    updateCard(cardIndex, updatedCard);
  }

  componentDidUpdate() {
    const card = document.querySelector(`[data-name=${this.props.cardIndex}]`);
    // console.log({card});
    const node = card.querySelector("[data-name='cardName']");
    // console.log({node});
    node.focus();
    var textNode = node.lastChild;
    var caret = textNode.length;
    var range = document.createRange();
    range.setStart(textNode, caret);
    range.setEnd(textNode, caret);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);


  }

  render() {
    return(
      <h6
        data-name="cardName"
        contentEditable="true"
        onInput={this.handleInput}>
        {this.props.cardName}
      </h6>
    );
  }

}

export default CardName;