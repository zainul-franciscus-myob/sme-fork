const getUserType = ({ isAdvisor }) => {
  if (isAdvisor === undefined) {
    return undefined;
  }

  return isAdvisor ? 'advisor' : 'SME';
};

export default ({
  region,
  businessId,
  businessRole,
  industry,
  subscription,
  currentUser,
}) =>
  businessId
    ? {
        region,
        businessId,
        businessRole,
        businessCreationDate: subscription.startDateTime,
        accountStatus: subscription.status,
        accountType: subscription.type,
        productCatalogId: subscription.product
          ? subscription.product.id
          : undefined,
        industry,
        userType: getUserType(currentUser),
      }
    : {};
