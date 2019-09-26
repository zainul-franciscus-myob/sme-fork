const getLeanEnagageFields = (user, appId) => ({
  user_id: user && user.userId,
  app_id: appId,
});

export default getLeanEnagageFields;
