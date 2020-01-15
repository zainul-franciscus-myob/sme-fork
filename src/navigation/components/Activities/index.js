import React from 'react';

import ImageIconMenu from '../ImageIconMenu';
import TasksIcon from '../images/TasksIcon.svg';
import TasksIconNotification from '../images/TasksIconNotification.svg';

const Activities = ({ onMenuLinkClick, className }) => (
  <div style={{ display: 'flex' }}>
    <ImageIconMenu
      image={TasksIcon}
      tooltip="Feed"
      onSelect={onMenuLinkClick}
      className={className}
      notificationIcon={TasksIconNotification}
    />
  </div>
);

export default Activities;
