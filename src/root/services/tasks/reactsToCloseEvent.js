const reactsToCloseEvent = (tasks, closeEvent) => {
  const hasCloseEvent = task => task.closeEvent === closeEvent;
  return tasks
  && tasks.some(t => hasCloseEvent(t) || (t.tasks && t.tasks.some(st => hasCloseEvent(st))));
};

export default reactsToCloseEvent;
