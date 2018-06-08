import React from 'react';
import PropTypes from 'prop-types';

class StartPage extends React.Component {

  static propTypes = {
    history: PropTypes.object
  };

  myInput = React.createRef();

  submitForm = (e) => {
    e.preventDefault();
    const btnSubmit = document.querySelector("button[type='submit']");
    const form = document.querySelector('.nodeID');
    const history = this.props.history;
    const nodeID = this.myInput.current.value;
    form.addEventListener('transitionend', gotoNote);
    btnSubmit.classList.toggle('activated');
    form.classList.toggle('activated');
    function gotoNote(e) {
      if(e.propertyName !== 'background-color') return;
      setTimeout(() => {
        history.push(`/note/${nodeID}`);
      }, 1250);
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    const ect = e.currentTarget;
    ect.classList.toggle('activated');
  };

  render() {
    return(
      <div>
      <form action="" className="nodeID" onClick={this.submitForm}>
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
      </div>
    )
  }
}

export default StartPage