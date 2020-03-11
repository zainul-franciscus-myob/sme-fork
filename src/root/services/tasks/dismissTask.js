const dismissTask = async ({
  taskKey, closeTasks,
}) => {
  if (!taskKey) return;
  await closeTasks({ closeEvent: `${taskKey}Dismiss` });
};

export default dismissTask;
