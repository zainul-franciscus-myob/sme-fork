export const getHeaderOptions = (state) => { // eslint-disable-line
  const { generalJournal: { lines, id, ...headerOptions } } = state;

  return headerOptions;
};
