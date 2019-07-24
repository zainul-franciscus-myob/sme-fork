const handleDatePickerChange = (handler, key) => ({ value }) => {
  handler({ key, value });
};

export default handleDatePickerChange;
