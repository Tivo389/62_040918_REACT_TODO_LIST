import React from 'react';
import { hot } from 'react-hot-loader'
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

  updateCard = (cardIndex, updatedCard) => {
    const taskCards = {...this.state.taskCards}
    taskCards[cardIndex] = updatedCard;
    this.setState({
      taskCards: taskCards
    });
  };

  updateLastState = (card='', property='', caret=0) => {
    this.setState({
      lastCard: card,
      lastProperty: property,
      lastCaretPosition: caret
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

  render() {
    return (
      <div className="app">
        <AppHeader text="React Todo List"/>
        <div className="cardWrapper">

          {Object.keys(this.state.taskCards).map(key => (
            <Card
              key={key}
              cardIndex={key}
              cardDetails={this.state.taskCards[key]}
              lastCard={this.state.lastCard}
              lastProperty={this.state.lastProperty}
              lastCaretPosition={this.state.lastCaretPosition}
              updateCard={this.updateCard}
              updateLastState={this.updateLastState}
              deleteCard={this.deleteCard}
              samples={sampleCards} // TEMP
            />
          ))}

          <div className="sampleBtnWrapper">
            <div className="btn" onClick={this.loadSamples}>
              Load Sample
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default hot(module)(App);