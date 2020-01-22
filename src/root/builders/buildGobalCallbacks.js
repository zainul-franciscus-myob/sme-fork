export default ({ closeManyTasks }) => ({
  businessDetailsConfirmed: () => closeManyTasks({ closeEvent: 'businessDetailsConfirmed' }),
});
