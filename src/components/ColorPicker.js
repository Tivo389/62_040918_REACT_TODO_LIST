import React from 'react';

class ColorPicker extends React.Component {

  // CONTINUE HERE ADD ONCLICK
  // Onclick, change the background color of the current card.
  changeColor = () => {
  };

  render() {
    return(
      <span className="colorPicker">
        <div className="colorPalette">
          <div>
            <span className="colorSwatch color1"></span>
            <span className="colorSwatch color2"></span>
            <span className="colorSwatch color3"></span>
          </div>
          <div>
            <span className="colorSwatch color4"></span>
            <span className="colorSwatch color5"></span>
            <span className="colorSwatch color6"></span>
          </div>
        </div>
        <i className="fas fa-paint-brush"></i>
      </span>
    )
  }

}

export default ColorPicker;