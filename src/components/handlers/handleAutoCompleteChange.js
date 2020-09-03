const handleAutoCompleteChange = (key, handler) => (item) => {
  handler({
    key,
    value: item ? item.id : '',
  });
};

export default handleAutoCompleteChange;
