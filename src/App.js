import React from 'react';
import { hot } from 'react-hot-loader'
import sampleCards from './sampleCards';
import AppHeader from './components/AppHeader';
import Card from './components/Card';

class App extends React.Component {

  state = {
    taskCards: {},
    lastCard: ''
  };

  loadSamples = () => {
    this.setState({
      taskCards: sampleCards
    });
  };

  updateCard = (cardIndex, updatedCard) => {
    const taskCards = {...this.state.taskCards};
    taskCards[cardIndex] = updatedCard;
    this.setState({
      taskCards: taskCards
    });
  };

  updateLastCard = (cardIndex) => {
    this.setState({
      lastCard: cardIndex
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
              updateCard={this.updateCard}
              updateLastCard={this.updateLastCard}
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
