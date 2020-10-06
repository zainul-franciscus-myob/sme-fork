const isFeatureEnabled = ({
  isFeatureCompleted = false,
  isEarlyAccess = false,
}) => {
  if (isFeatureCompleted) return true;

  return isEarlyAccess;
};

export default isFeatureEnabled;
