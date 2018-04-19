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

  updateTask = (cardIndex, taskIndex, updatedTask) => {
    const taskCards = {...this.state.taskCards};
    taskCards[cardIndex].tasks[taskIndex] = updatedTask;
    this.setState({
      taskCards: taskCards
    });
    console.log(taskCards);
  };

  render() {
    return (
      <div className="app">
        <AppHeader text="React Todo List"/>
        <div className="cardWrapper">

          {Object.keys(this.state.taskCards).map(key => (
            <TaskCard key={key} cardIndex={key} details={this.state.taskCards[key]} updateTask={this.updateTask} />
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
