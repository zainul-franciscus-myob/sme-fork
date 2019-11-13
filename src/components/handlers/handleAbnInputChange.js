const handleAbnInputChange = handler => (e) => {
  const { rawValue, name } = e.target;
  handler({ key: name, value: rawValue });
};

export default handleAbnInputChange;
