const validate = (value) => {
  const stringValue = String(value);
  const regexPattern = '[,.+\\-*\\/()0-9 ]*';
  const regex = new RegExp(regexPattern);
  const groups = stringValue.match(regex);
  return groups[0] === groups.input;
};

export default validate;
