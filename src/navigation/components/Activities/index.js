import React from 'react';

import ImageIconMenu from '../ImageIconMenu';
import TasksIcon from '../images/TasksIcon.svg';
import TasksIconNotification from '../images/TasksIconNotification.svg';

const Activities = ({ onMenuLinkClick, className, showNotificationIcon }) => {
  const moreProps = showNotificationIcon ? { notificationIcon: TasksIconNotification } : {};
  return (
    <div style={{ display: 'flex' }}>
      <ImageIconMenu
        image={TasksIcon}
        tooltip="Feed"
        onSelect={onMenuLinkClick}
        className={className}
        {...moreProps}
      />
    </div>
  );
};

export default Activities;
