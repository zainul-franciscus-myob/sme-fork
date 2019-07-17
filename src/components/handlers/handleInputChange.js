const handleInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

export default handleInputChange;
