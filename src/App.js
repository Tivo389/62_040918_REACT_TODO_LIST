import React from 'react';
import update from 'immutability-helper';
import { hot } from 'react-hot-loader'
import defaultCards from './defaultCards';
import sampleCards from './sampleCards';
import AppHeader from './components/AppHeader';
import Card from './components/Card';

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

  loadDefault = () => {
    this.setState({
      taskCards: defaultCards,
      lastCard: '',
      lastProperty: '',
      lastCaretPosition: 0
    });
  };

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
    delete taskCards[cardIndex];
    // taskCards[cardIndex] = null; // If you want to update Firebase the value must be null.
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
          cardColor: [randomColor()],
          cardTasks: {}
        }
      }
    });
    this.setState({
      taskCards: taskCards
    });
  }

  componentWillMount() {
    this.loadDefault();
  }

  render() {
    return (
      <div className="app">
        <AppHeader text="React Notes"/>
        <div className="sampleBtnWrapper">
          <div className="btn" onClick={this.loadSamples}>
            <i className="fas fa-flask"></i>
            Load Samples
          </div>
          <div className="btn" onClick={this.addCard}>
            <i className="fas fa-plus-square addNote"></i>
            Add Note
          </div>
        </div>
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
      </div>
    );
  }
}

export default hot(module)(App);