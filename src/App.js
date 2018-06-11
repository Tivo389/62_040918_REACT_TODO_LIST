import React from 'react';
import update from 'immutability-helper';
import { hot } from 'react-hot-loader'
// import defaultCards from './defaultCards';
import sampleCards from './sampleCards';
import Card from './components/Card';
import base from  './base';

class App extends React.Component {

  state = {
    taskCards: {},
    lastCard: '',
    lastProperty: '',
    lastCaretPosition: 0
  };

  // LOAD SAMPLES CARDS
  loadSamples = () => {
    this.setState({
      taskCards: sampleCards,
      lastCard: '',
      lastProperty: '',
      lastCaretPosition: 0
    });
  };

  // Was conflicting with firebase, so commented out.
  // loadDefault = () => {
  //   this.setState({
  //     taskCards: defaultCards,
  //     lastCard: '',
  //     lastProperty: '',
  //     lastCaretPosition: 0
  //   });
  // };

  // UPDATES THE STATE
  updateState = (updatedCard, cardIndex='', property='', caretPosition=0) => {
    const taskCards = {...this.state.taskCards}
    taskCards[cardIndex] = updatedCard;
    this.setState({
      taskCards: taskCards,
      lastCard: cardIndex,
      lastProperty: property,
      lastCaretPosition: caretPosition
    });
  };

  // DELETES THE CARD
  deleteCard = (cardIndex) => {
    const taskCards = {...this.state.taskCards};
    // START / PRE-FIREBASE IMPLEMENTATION
    // delete taskCards[cardIndex];
    // END / PRE-FIREBASE IMPLEMENTATION
    // START / POST-FIREBASE IMPLEMENTATION
    taskCards[cardIndex] = null;
    // END / POST-FIREBASE IMPLEMENTATION
    this.setState({
      taskCards: taskCards
    });
  };

  // ADDS A CARD
  addCard = () => {
    const newCard = `card${Date.now()}`;
    const colors = ['#F9F9A2','#CCEFFF','#FFBFCE','#D7FFBF','#EDBFFF','#FAFAFA'];
    const randomColor = () => {
      return colors[Math.floor(Math.random() * colors.length)];
    };
    let taskCards = {...this.state.taskCards};
    taskCards = update(taskCards, {
      $merge: {
        [newCard]: {
          cardName: "",
          cardColor: randomColor(),
          cardTasks: {
            task1: {
              taskText: "",
              taskDone: 'false'
            }
          }
        }
      }
    });
    this.setState({
      taskCards: taskCards
    });
  };

  // MAIN BTN MOUSE DOWN / NOT CLICK SINCE IT WILL COUNT THE DOWN FOR ADDITIONAL FUNCTIONS
  btnMainMouseDown = (e) => {
    const startTime = Date.now();
    e.currentTarget.setAttribute('data-startTime', startTime);
  };

  // MAIN BTN MOUSE UP / NOT CLICK SINCE IT WILL COUNT THE DOWN FOR ADDITIONAL FUNCTIONS
  btnMainMouseUp = (e, duration = 1) => {
    const startTime = Number(e.currentTarget.dataset.starttime);
    const endTime = Math.round(((Date.now() - startTime) / 1000) * 10) / 10;
    endTime > duration ? this.loadSamples() : this.addCard();
  };

  // MAIN BTN TOUCH START
  btnMainTouchStart = (e) => {
    e.preventDefault();
    this.btnMainMouseDown(e);
  };

  // MAIN BTN TOUCH END
  btnMainTouchEnd = (e) => {
    e.preventDefault();
    this.btnMainMouseUp(e, 0.25);
  };

  // RUNS DURING ONLY THE FIRST RENDER && AFTER COMPONENT IS RENDERED
  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.noteID);
    // After initial-render check if there is data in the localStorage.
    if(localStorageRef) {
      this.setState({
        taskCards: JSON.parse(localStorageRef)
      });
    } else {
      this.ref = base.syncState(`${params.noteID}`, {
        context: this,
        state: 'taskCards'
      });
    }
  }

  // RUNS AFTER COMPONENT IS RENDERED
  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.noteID,
      JSON.stringify(this.state.taskCards)
    );
  }

  // RUNS WHEN COMPONENT IS REMOVED FROM DOM
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    const cardsExist = Object.keys(this.state.taskCards).length > 0;
    const mainContent = cardsExist ? (
      <div className="cardWrapper">
        {Object.keys(this.state.taskCards).map(key => (
          <Card
            key={key}
            cardIndex={key}
            cardDetails={this.state.taskCards[key]}
            lastCard={this.state.lastCard}
            lastProperty={this.state.lastProperty}
            lastCaretPosition={this.state.lastCaretPosition}
            updateState={this.updateState}
            deleteCard={this.deleteCard}
          />
        ))}
      </div>
    ) : (
      <div className="noCard">
        <p>Lets make a note<i className="far fa-hand-point-right"></i></p>
      </div>
    );
    return (
      <div className="app">
        {mainContent}
        <div
          className="btn btnMain"
          onMouseDown={this.btnMainMouseDown}
          onMouseUp={this.btnMainMouseUp}
          onTouchStart={this.btnMainTouchStart}
          onTouchEnd={this.btnMainTouchEnd}
        >
          <i className="fas fa-plus"></i>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);