import React from 'react';

const Task = (props) => (
  <li><div role="checkbox"></div>{props.taskDetail.name}</li>
);

export default Task;