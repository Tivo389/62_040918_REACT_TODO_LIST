import React from 'react';
import PropTypes from 'prop-types';

class StartPage extends React.Component {

  static propTypes = {
    history: PropTypes.object
  };

  myInput = React.createRef();

  goToNote = (e) => {
    e.preventDefault();
    this.startTakeNote(e);
    // const nodeID = this.myInput.current.value;
    // this.props.history.push(`/note/${nodeID}`);
  };

  startTakeNote = (e) => {
    const ect = e.currentTarget;
    const btnSubmit = document.querySelector("button[type='submit']");
    const faCheckSq = btnSubmit.querySelector('.fa-check-square');
    // ect.classList.add('activated');
    // btnSubmit.classList.add('activated');
    faCheckSq.classList.toggle('activated');
  };

  render() {
    return(
      <form action="" className="nodeID" onSubmit={this.goToNote}>
        <input
          type="text"
          placeholder="Note ID Number"
          defaultValue={Date.now()} ref={this.myInput}
          className="hidden"
          required />
        <button type="submit">
          <span className="fa-layers fa-fw">
            <i className="far fa-square"></i>
            <i className="far fa-check-square"></i>
          </span>
          Take Note
        </button>
      </form>
    )
  }
}

export default StartPage