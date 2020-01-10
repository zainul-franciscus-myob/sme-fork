import React from 'react';

import ImageIconMenu from './ImageIconMenu';
import TasksIcon from './images/TasksIcon.svg';

const Activities = ({ onMenuLinkClick, className }) => (
  <ImageIconMenu
    image={TasksIcon}
    tooltip="Feed"
    onSelect={onMenuLinkClick}
    className={className}
  />
);

export default Activities;
