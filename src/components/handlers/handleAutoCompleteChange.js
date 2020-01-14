const handleAutoCompleteChange = (key, handler) => (item) => {
  handler({
    key,
    value: item,
  });
};

export default handleAutoCompleteChange;
