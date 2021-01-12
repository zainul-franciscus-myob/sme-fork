import React from 'react';

const SystemUpgradedMessage = ({ task, dismissTask }) => {
  if (!task.isComplete) {
    const { appcue } = task.routeParams;
    if (window.Appcues && appcue) window.Appcues.show(appcue);
    dismissTask(task.key);
  }

  return <></>;
};

export default SystemUpgradedMessage;
