import React from 'react';
import PropTypes from 'prop-types';

class CardName extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    cardDetails: PropTypes.shape({
      cardName: PropTypes.string,
      cardColor: PropTypes.string,
      cardTasks: PropTypes.shape({
        task: PropTypes.shape({
          taskText: PropTypes.string,
          taskDone: PropTypes.string
        })
      })
    }),
    handleInput: PropTypes.func
  };

  render() {
    return(
      <h6
        data-name="cardName"
        data-type="cardName"
        contentEditable="true"
        onInput={this.props.handleInput}>
        {this.props.cardDetails.cardName}
      </h6>
    );
  }

}

export default CardName;