const getSelected = (state) =>
  state.draftPayRun.lines.filter((line) => line.isSelected);

const getNumberOfSelected = (state) => getSelected(state).length;

export default getNumberOfSelected;
