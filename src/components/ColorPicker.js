import React from 'react';
import update from 'immutability-helper';

class ColorPicker extends React.Component {

  changeColor = (e) => {
    const {cardIndex, cardDetails, updateState} = this.props;
    const selectedColor = window.getComputedStyle(e.currentTarget,null)['background-color'];
    const targetCard = document.querySelector(`[data-name="${cardIndex}"]`);
    targetCard.style.backgroundColor = selectedColor;
    let updatedCard = {...cardDetails};
    updatedCard = update(updatedCard, {
      $merge: { cardColor: selectedColor }
    });
    updateState(updatedCard, cardIndex);
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