const getLeanEnagageFields = ({
  userAuth,
  appId,
  businessDetails,
  currentUser,
  subscription,
}) => {
  const userId = userAuth && userAuth.userId;

  return {
    user_id: userId,
    name: currentUser.userName,
    email: currentUser.email,
    user_identity_id: userId,
    software_id: businessDetails.serialNumber,
    custom_data: {
      user_type: currentUser.isAdvisor ? 'partner' : 'SME',
      region: businessDetails.region,
      account_status: subscription.type === 'free' ? 'trial' : 'active',
      product_type: subscription.product ? `${subscription.product.name}_${subscription.product.id}` : undefined,
    },
    company: {
      company_id: subscription.businessId,
      name: businessDetails.organisationName,
    },
    app_id: appId,
  };
};

export default getLeanEnagageFields;
