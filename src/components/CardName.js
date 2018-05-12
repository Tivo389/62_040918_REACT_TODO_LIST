import React from 'react';

class CardName extends React.Component {

  render() {
    return(
      <h6
        data-name="cardName"
        contentEditable="true"
        onKeyDown={this.props.handleKeyDown}
        onInput={this.props.handleInput}>
        {this.props.cardDetails.cardName}
      </h6>
    );
  }

}

export default CardName;