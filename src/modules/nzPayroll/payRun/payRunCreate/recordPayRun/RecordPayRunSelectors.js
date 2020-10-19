const getSelected = (state) =>
  state.employeePayList.lines.filter((line) => line.isSelected);

const getNumberOfSelected = (state) => getSelected(state).length;

export default getNumberOfSelected;
