import React from 'react';
import sampleCards from './sampleCards';
import TaskCard from './components/TaskCard';
import AppHeader from './components/AppHeader';

class App extends React.Component {

  state = {
    taskCards: {}
  };

  loadSamples = () => {
    this.setState({
      taskCards: sampleCards
    });
  }

  render() {
    return (
      <div className="app">
        <AppHeader text="React Todo List"/>
        <div className="cardWrapper">

          {Object.keys(this.state.taskCards).map(key => (
            <TaskCard key={key} details={this.state.taskCards[key]}/>
          ))}

          <div className="sampleBtnWrapper">
            <div className="btn" onClick={this.loadSamples}>Load Sample</div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
