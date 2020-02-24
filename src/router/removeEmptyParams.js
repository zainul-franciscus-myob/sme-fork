const removeEmptyParams = (params = {}) => {
  const temp = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== undefined) {
      temp[key] = value;
    }
  });

  return temp;
};

export default removeEmptyParams;
