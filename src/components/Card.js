import React from 'react';
import update from 'immutability-helper';
import CardTask from './CardTask';
import CardName from './CardName';
import ColorPicker from './ColorPicker';

class Card extends React.Component {

  handleKeyDown = (e) => {
    const isEnter = e.key === 'Enter';
    let caret = window.getSelection();
    // IF YOU PRESSED ENTER
    if(isEnter) {
      e.preventDefault();
      const nodeCurrent = caret.anchorNode;
      const nodeOffset = caret.anchorOffset;
      let   nodeCurrentValue = nodeCurrent.nodeValue;
      let   nodeIsNewBreak = nodeCurrent.nodeValue === " ";
      // COUNTER NBSP && EMPTY LINE BREAK PREVENTION (There is probably a better way...)
      // - I was unable to replicate what I saw on Google Keep. Looked like an 'EMPTY text node'?
      if(nodeCurrent.length > 1  && nodeCurrentValue[nodeCurrentValue.length - 1] === " ") {
        nodeCurrent.nodeValue = nodeCurrentValue.slice(0, nodeCurrentValue.length - 1);
        nodeIsNewBreak = true;
      } else if(nodeCurrent.nodeValue === null) return;
      const ect = e.currentTarget;
      const nodesAll = ect.childNodes;
      const nodeCurrentIndex = Array.from(nodesAll).indexOf(nodeCurrent);
      const nodeOneOnly = nodesAll.length === 1;
      const nodeIsFirst = nodeCurrentIndex === 0;
      const nodeIsLast = nodesAll.length === (nodeCurrentIndex + 1);
      let   strFirstHalf = ect.innerHTML.slice(0, caret.anchorOffset);
      let   strSecondHalf = ect.innerHTML.slice(caret.anchorOffset, ect.innerHTML.length);
      const strCaretAtStart = caret.anchorOffset === 0;
      const strCaretAtEnd = caret.anchorOffset === nodeCurrent.length;
      const strCaretInStr = strCaretAtStart === false && strCaretAtEnd === false;
      let lineBreakPos;
      if(nodeOneOnly) {
        // AND IF THERE IS ONLY 1 NODE
        if(strCaretAtStart) {
          // AND CARET IS AT START OF NODE
          console.log('== handleKeyDown / ENTER / MONO / caretAtStart ==');
          ect.insertAdjacentHTML('afterbegin', "\u00A0<br>");
          lineBreakPos = 'caretAtStart';
        } else if(strCaretAtEnd) {
          // AND CARET IS AT END OF NODE
          console.log('== handleKeyDown / ENTER / MONO / caretAtEnd ==');
          ect.insertAdjacentHTML('beforeend', "<br>\u00A0");
          lineBreakPos = 'caretAtEnd';
        } else if(strCaretInStr) {
          // AND CARET IS MID-NODE
          console.log('== handleKeyDown / ENTER / MONO / caretInStr ==');
          ect.innerHTML = `${strFirstHalf}<br>${strSecondHalf}`;
          lineBreakPos = 'caretInStr';
        }
        caret = this.getCaretPos(e, lineBreakPos);
        return this.handleInput(e,caret);
      } else {
        // AND IF THERE IS MORE THAN 1 NODE
        if(nodeIsFirst && strCaretAtStart) {
          // AND CARET IS AT START OF NODE
          console.log('== handleKeyDown / ENTER / MULTI / caretAtStart ==');
          ect.insertAdjacentHTML('afterbegin', "\u00A0<br>");
          lineBreakPos = 'caretAtStart';
        } else if( (nodeIsLast && strCaretAtEnd) || (nodeIsLast && nodeIsNewBreak) ) {
          // AND CARET IS AT END OF NODE
          console.log('== handleKeyDown / ENTER / MULTI / caretAtEnd ==');
          ect.insertAdjacentHTML('beforeend', "<br>\u00A0");
          lineBreakPos = 'caretAtEnd';
        } else if(!nodeIsFirst && !strCaretAtEnd) {
          // AND CARET IS MID-NODE
          console.log('== handleKeyDown / ENTER / MULTI / caretInStr ==');
          const nodesArray = [...nodesAll];
          const nodesFirstHalf = nodesArray
            .splice(0,nodeCurrentIndex)
            .reduce((accumulator,element) => {
              const isStr = element.textContent !== "";
              return isStr ? accumulator += element.textContent : accumulator += element.outerHTML;
            },'');
          const nodeToSplit = nodesArray.splice(0,1);
          const nodesSecondHalf = nodesArray
            .reduce((accumulator,element) => {
              const isStr = element.textContent !== "";
              return isStr ? accumulator += element.textContent : accumulator += element.outerHTML;
            },'');
          strFirstHalf = nodeToSplit[0].textContent.slice(0, nodeOffset);
          strSecondHalf = nodeToSplit[0].textContent.slice(nodeOffset, nodeToSplit[0].textContent.length);
          ect.innerHTML = `${nodesFirstHalf}${strFirstHalf}<br>${strSecondHalf}${nodesSecondHalf}`;
          lineBreakPos = 'caretInStr';
        }
        caret = this.getCaretPos(e, lineBreakPos, nodeCurrentIndex, nodeOffset);
        return this.handleInput(e,caret);
      }
    }
    // IF YOU PRESSED A KEY OTHER THAN ENTER
    caret = this.getCaretPos(e);
    console.log(caret);
    this.handleInput(e,caret);
  };


  getCaretPos = (e, lineBreakPos, nodeCurrentIndex, nodeOffset) => {
    const ect = e.currentTarget;
    const allNodes = ect.childNodes;
    const currentNode = window.getSelection().anchorNode;
    const currentNodeIndex = Array.from(allNodes).indexOf(currentNode);
    const caretOffset = [0,0];
    const textInput = allNodes.length !== 0 && currentNodeIndex !== -1 && lineBreakPos === undefined;
    const brInput = lineBreakPos !== undefined;
    const doc = ect.ownerDocument || ect.document;
    const win = doc.defaultView || doc.parentWindow;
    if(textInput) {
      // console.log('== getCaretPos / TEXT INPUT ==');
      caretOffset[0] = currentNodeIndex;
      let sel;
      if (typeof win.getSelection !== "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
          const range = win.getSelection().getRangeAt(0);
          caretOffset[1] = range.endOffset;
        }
      } else if ( (sel = doc.selection) && sel.type !== "Control" ) {
        const textRange = sel.createRange();
        const preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(ect);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset[1] = preCaretTextRange.text.length;
      }
      return caretOffset;
    } else if(brInput) {
      if(lineBreakPos === 'caretAtStart') {
        // console.log('== getCaretPos / BR INPUT / caretAtStart ==');
        return caretOffset;
      } else if (lineBreakPos === 'caretAtEnd') {
        // console.log('== getCaretPos / BR INPUT / caretAtEnd ==');
        caretOffset[0] = ect.childNodes.length - 1;
      } else if (lineBreakPos === 'caretInStr') {
        // console.log('== getCaretPos / BR INPUT / caretInStr ==');
        caretOffset[0] = nodeCurrentIndex + 2;
        caretOffset[1] = 0;
      }
      return caretOffset;
    }
  };



  handleInput = (e, caret) => {
    // console.log('== handleInput ==');
    // console.log(caret);
    const {cardIndex, cardDetails, updateCard, updateLastState} = this.props;
    const property = e.currentTarget.dataset.name;
    let updatedCard = {...cardDetails};
    if(property.includes('task')) {
      // WITH IMMUTABILITY HELPER
      updatedCard = update(updatedCard, {                   //01. Update 'updatedCard's...
        cardTasks: {                                        //02. 'cardTasks'...
          [property]: {                                     //03. property = current 'task'
            $merge: { taskName:e.currentTarget.innerHTML }  //04. Merge this object with the data-structure
          }
        }
      });
      // WITHOUT IMMUTABILITY HELPER
      // const updatedTask = {...cardDetails.cardTasks[property]};  //01. Make copy of the 'task'
      // updatedTask.taskName = e.currentTarget.textContent;        //02. Reassign the 'taskName' in the 'task'
      // const updatedTasks = {...cardDetails.cardTasks};           //03. Make a copy of the 'task[S]'
      // updatedTasks[property] = updatedTask;                      //04. Reassign the 'task' in the 'task[S]'
      // updatedCard.cardTasks = updatedTasks;                      //05. Reassign the 'task[S]' in the 'card'
    } else {
      updatedCard[property] = e.currentTarget.innerHTML;
    }
    updateLastState(cardIndex, property, caret);
    updateCard(cardIndex, updatedCard);
  };



  addTask = (e) => {
    const {cardIndex, cardDetails, updateCard, updateLastState} = this.props;
    const length = Object.keys(cardDetails.cardTasks).length;
    const newTask = `task${length}${Date.now()}`;
    let updatedCard = {...cardDetails};
    updatedCard = update(updatedCard, {
      cardTasks: {
        $merge: {
          [newTask]: { taskDone:"false", taskName:'' }
        }
      }
    });
    updateLastState(cardIndex, newTask);
    updateCard(cardIndex, updatedCard);
  };



  restoreTextAsHTML = (cardProperty, cardIndex, cardDetails, lastCaretPosition) => {
    // console.log('== restoreTextAsHTML ==');
    // console.log(lastCaretPosition);
    const targetCard = document.querySelector(`div[data-name=${cardIndex}]`);
    if( cardProperty.dataset.name.includes('task') ) {
      const tasksContainer = targetCard.querySelector('ul[data-name="cardTasks"]');
      for (let key in cardDetails.cardTasks) {
        const task = tasksContainer.querySelector(`span[data-name="${key}"]`);
        task.innerHTML = cardDetails.cardTasks[key].taskName;
      }
      return cardProperty.childNodes[lastCaretPosition[0]];
    } else {
      cardProperty.innerHTML = cardDetails.cardName;
      return cardProperty.firstChild;
    }
  };



  restoreCaretPosition = (cardProperty, textNode, lastCaretPosition) => {
    // console.log('== restoreCaretPosition ==');
    // console.log(lastCaretPosition);
    if( textNode === null || textNode === undefined ) {
      cardProperty.focus(); // Add task => Focus on input
    } else {
      const range = document.createRange();
      range.setStart(textNode, lastCaretPosition[1]);
      range.setEnd(textNode, lastCaretPosition[1]);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };



  componentDidUpdate(e) {
    const { cardIndex, cardDetails, lastCard, lastProperty, lastCaretPosition } = this.props;
    const lastCardExists = lastCard !== '';
    const sameAsLastCard = e.cardIndex === lastCard;
    const isTaskOrName = lastProperty.includes('task') || lastProperty.includes('cardName');
    if( lastCardExists && sameAsLastCard && isTaskOrName ) {
      const cardName = document.querySelector(`[data-name=${lastCard}]`);
      const cardProperty = cardName.querySelector(`[data-name=${lastProperty}]`);
      if(cardProperty != null) {
        const textNode = this.restoreTextAsHTML(cardProperty, cardIndex, cardDetails, lastCaretPosition);
        this.restoreCaretPosition(cardProperty, textNode, lastCaretPosition);
      }
    }
  }

  render() {
    const {cardIndex, cardDetails, updateCard, deleteCard, updateLastState} = this.props;
    const divStyle = { backgroundColor: cardDetails.cardColor };
    return (
      <div className="cardContainer" data-name={cardIndex} style={divStyle}>
        <CardName
          name="cardName"
          cardDetails={cardDetails}
          handleKeyDown={this.handleKeyDown}
        />
        <ul data-name="cardTasks">
          {Object.keys(cardDetails.cardTasks).map(key => (
            <CardTask
              name="cardTasks"
              key={key}
              taskIndex={key}
              cardIndex={cardIndex}
              cardDetails={cardDetails}
              updateCard={updateCard}
              handleKeyDown={this.handleKeyDown}
            />
          ))}
          <li>
            <span role="button"
              data-name="addTaskBtn"
              onClick={this.addTask}>
              <span>+</span>
              <span>Add Task</span>
            </span>
          </li>
        </ul>
        <div className="cardToolBox">
          <ColorPicker
            name="cardColor"
            cardIndex={cardIndex}
            cardDetails={cardDetails}
            updateCard={updateCard}
            updateLastState={updateLastState}
          />
          <span onClick={() => deleteCard(cardIndex)}>
            <i className="fas fa-trash-alt"></i>
          </span>
        </div>
      </div>
    );
  }

}

export default Card;