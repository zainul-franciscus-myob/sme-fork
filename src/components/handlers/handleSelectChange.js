const handleSelectChange = handler => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value });
};

export default handleSelectChange;
