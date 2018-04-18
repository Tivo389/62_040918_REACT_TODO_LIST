import React from 'react';

const handleCheckbox = (e) => {
  let isChecked = e.target.attributes['aria-checked'].value === 'true';
  if(isChecked) {
    e.target.classList.remove('checked');
    e.target.parentNode.classList.remove('checked');
    e.target.attributes['aria-checked'].value = false;
  } else {
    e.target.classList.add('checked');
    e.target.parentNode.classList.add('checked');
    e.target.attributes['aria-checked'].value = true;
  }
}

const Task = (props) => (
  <li>
    <div role="checkbox" onClick={handleCheckbox} aria-checked="false"></div>
    <span>{props.taskDetail.name}</span>
  </li>
);

export default Task;