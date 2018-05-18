import React from 'react';

class CardName extends React.Component {

  render() {
    if (this.props.cardDetails.cardName) {
      return(
        <h6
          data-name="cardName"
          data-type="cardName"
          contentEditable="true"
          onKeyDown={this.props.handleKeyDown}
          onInput={this.props.handleInput}>
          {this.props.cardDetails.cardName}
        </h6>
      );
    } else {
      return null;
    }
  }

}

export default CardName;