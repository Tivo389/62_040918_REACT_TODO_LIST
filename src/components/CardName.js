import React from 'react';

class CardName extends React.Component {

  handleInput(e) {
    console.log('=================');
    console.dir(e.currentTarget.textContent);

    // CONTINUE HERE

    // console.dir(t.props.cardDetails.cardName);
    // const updatedCardName = {...this.props.cardDetails.cardName};
    // console.log(updatedCardName);
    // cardName: e.currentTarget.textContent
  }

  render() {
    return(
      <h6 contentEditable="true" onInput={this.handleInput}>
        {this.props.cardName}
      </h6>
    );
  }

}

export default CardName;