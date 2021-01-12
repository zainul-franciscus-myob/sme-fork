import React from 'react';

const TaskIcon = ({ task, width }) => {
  const svgPath = () => {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`./Onboarding/assets/${task.key}.svg`);
    } catch {
      return null;
    }
  };
  const taskIconPath = svgPath(task.key) || svgPath(task.template);

  if (taskIconPath) {
    return <img src={taskIconPath} alt={task.title} width={width} />;
  }
  return null;
};

export default TaskIcon;
