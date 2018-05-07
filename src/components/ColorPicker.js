import React from 'react';

class ColorPicker extends React.Component {

  changeColor = (e) => {
    const {name, cardIndex, cardDetails, updateCard, updateLastState} = this.props;
    const selectedColor = window.getComputedStyle(e.currentTarget,null)['background-color'];
    const targetCard = document.querySelector(`[data-name="${cardIndex}"]`);
    targetCard.style.backgroundColor = selectedColor;
    cardDetails[name] = selectedColor;
    const updatedCard = {
      ...cardDetails
    }
    updateLastState();
    updateCard(cardIndex, updatedCard);
  };

  render() {
    return(
      <span className="colorPicker">
        <div className="colorPalette">
          <div>
            <span
              className="colorSwatch color1"
              onClick={this.changeColor}>
            </span>
            <span
              className="colorSwatch color2"
              onClick={this.changeColor}>
            </span>
            <span
              className="colorSwatch color3"
              onClick={this.changeColor}>
            </span>
          </div>
          <div>
            <span
              className="colorSwatch color4"
              onClick={this.changeColor}>
            </span>
            <span
              className="colorSwatch color5"
              onClick={this.changeColor}>
            </span>
            <span
              className="colorSwatch color6"
              onClick={this.changeColor}>
            </span>
          </div>
        </div>
        <i className="fas fa-paint-brush"></i>
      </span>
    )
  }

}

export default ColorPicker;