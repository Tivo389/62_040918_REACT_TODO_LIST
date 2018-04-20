import React from 'react';
import Task from './Task';

class TaskCard extends React.Component {

  updateCardTitle(e,t) {
    console.dir(e.currentTarget.textContent);
    console.dir(t.props.details.cardName);
    // const updatedCardTitle = {...this.props.details.cardName};
    // console.log(updatedCardTitle);
    // cardName: e.currentTarget.textContent
  }

  render() {
    const { cardName, cardColor, cardTasks } = this.props.details;
    const { cardIndex, updateCard } = this.props;
    const divStyle = { backgroundColor: cardColor };
    return(
      <div className="cardContainer" style={divStyle}>

        {/* CONTINUE HERE MAKE THE HEADER INTO A COMPONENT */}
        <h6 name="cardName" contentEditable="true" onInput={(e) => {this.updateCardTitle(e,this)}}>{cardName}</h6>
        <ul>
          {Object.keys(cardTasks).map(key => (
            <Task name="cardTasks" key={key} cardIndex={cardIndex} taskIndex={key} taskDetail={cardTasks[key]} updateCard={updateCard} />
          ))}
        </ul>
        <div className="cardToolBox">
          <i className="fas fa-paint-brush"></i>
          <i className="fas fa-trash-alt"></i>
        </div>
      </div>
    );
  }

}

export default TaskCard;