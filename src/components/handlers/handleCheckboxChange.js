const handleCheckboxChange = (handler) => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

export default handleCheckboxChange;
