import React from 'react';

class CardTitle extends React.Component {

  handleInput = (event) => {
    // MAKE A COPY, OF THE CURRENT STATE AND UPDATE IT
    // console.log(this.state.title);
  }

  render() {
    return(
      <div>
        <h6 onInput={this.handleInput} contentEditable="true">Title of List</h6>
      </div>
    );
  }

}

export default CardTitle;