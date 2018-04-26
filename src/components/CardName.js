import React from 'react';

class CardName extends React.Component {

  render() {
    return(
      <h6
        data-name="cardName"
        contentEditable="true"
        onInput={this.props.handleInput}
        onKeyDown={this.props.getCaretPos}
        >
        {this.props.cardDetails.cardName}
      </h6>
    );
  }

}

export default CardName;