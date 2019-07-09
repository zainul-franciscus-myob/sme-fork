const handleComboboxChange = (key, handler) => (item) => {
  handler({
    key,
    value: item.id,
  });
};

export default handleComboboxChange;
