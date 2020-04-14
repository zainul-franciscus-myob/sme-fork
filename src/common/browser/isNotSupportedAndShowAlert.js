const isNotSupportedFileConstructor = () => {
  let file;
  try {
    file = new File([], () => {});
  } catch (error) {
    return true;
  }
  return !file;
};

const isNotSupportedAndShowAlert = () => isNotSupportedFileConstructor();

export default isNotSupportedAndShowAlert;
