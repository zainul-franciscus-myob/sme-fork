import React from 'react';

const SystemUpgradedMessage = ({ task, dismissTask }) => {
  if (!task.isComplete) {
    window.Appcues.show(task.routeParams.appcue);
    dismissTask(task.key);
  }

  return <></>;
};

export default SystemUpgradedMessage;
