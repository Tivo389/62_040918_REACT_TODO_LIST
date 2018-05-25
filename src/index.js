import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import registerServiceWorker from './registerServiceWorker';
import './css/stylesheet.css';

console.error = (function() {
  var error = console.error;
  return function(exception) {
    if ((exception + '').indexOf('Warning: A component is `contentEditable`') !== 0) {
      error.apply(console, arguments)
    }
  }
})();

ReactDOM.render(
  <Router />,
  document.getElementById('root')
);
registerServiceWorker();