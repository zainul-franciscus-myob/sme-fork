const handleRadioButtonChange = (name, handler) => (e) =>
  handler({ key: name, value: e.value });

export default handleRadioButtonChange;
