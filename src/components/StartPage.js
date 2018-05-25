import React from 'react';
import PropTypes from 'prop-types';

class StartPage extends React.Component {

  static propTypes = {
    history: PropTypes.object
  };

  myInput = React.createRef();

  goToNote = (e) => {
    e.preventDefault();
    const nodeID = this.myInput.current.value;
    this.props.history.push(`/note/${nodeID}`);
  };

  render() {
    return(
      <form action="" className="nodeID" onSubmit={this.goToNote} >
        <h2>Please Enter A Store</h2>
        <input type="text" placeholder="Note ID Number" defaultValue={Date.now()} ref={this.myInput} required />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

export default StartPage