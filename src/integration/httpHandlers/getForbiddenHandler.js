const getForbiddenHandler = ({
  responseBody: { forbiddenResponseCode },
  handleMap,
  handleDefault,
}) => {
  const handler = handleMap[forbiddenResponseCode];

  if (handler) {
    return handler;
  }

  return handleDefault;
};

export default getForbiddenHandler;
