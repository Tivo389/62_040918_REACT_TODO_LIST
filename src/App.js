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
  }

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
        <p>Lets make a note<i class="far fa-hand-point-right"></i></p>
      </div>
    );
    return (
      <div className="app">
        {/*<div className="sampleBtnWrapper">
          <div className="btn" onClick={this.loadSamples}>
            <i className="fas fa-flask"></i>
            Load Samples
          </div>
          <div className="btn" onClick={this.addCard}>
            <i className="fas fa-plus-square addNote"></i>
            Add Note
          </div>
        </div>*/}
        {mainContent}
        {/*CONTINUE HERE MAKE A FUNCTION FOR BTN/TOUCH DOWN*/}
        <div className="btn" onClick={this.addCard}>
          <i className="fas fa-plus"></i>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);