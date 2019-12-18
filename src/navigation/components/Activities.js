import React from 'react';

import ImageIconMenu from './ImageIconMenu';
import TasksIcon from './images/TasksIcon.svg';

const Activities = ({ onMenuLinkClick }) => (
  <ImageIconMenu
    image={TasksIcon}
    tooltip="Feed"
    onSelect={onMenuLinkClick}
  />
);

export default Activities;
