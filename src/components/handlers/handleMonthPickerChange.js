const handleMonthPickerChange = (handler, key) => ({ value }) => {
  handler({ key, value });
};

export default handleMonthPickerChange;
