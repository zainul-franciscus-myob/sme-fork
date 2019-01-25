const removeEmptyParams = (params = {}) => {
  const temp = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== '') {
      temp[key] = value;
    }
  });

  return temp;
};

export default removeEmptyParams;
