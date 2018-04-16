import React from 'react';
import sampleCards from './sampleCards';
import TaskCard from './components/TaskCard';
import Header from './components/Header';

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
        <Header text="React Todo List"/>
        <div className="cardWrapper">

          {Object.keys(this.state.taskCards).map(key => (
            // CONTINUE HERE PASS THE PROPS
            <TaskCard />
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
