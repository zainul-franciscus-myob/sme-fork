export default ({ businessId, subscription, user, customProperties }) =>
  businessId
    ? {
        userId: user.userId,
        businessId,
        action: '',
        label: '',
        url: window.location.href,
        product: subscription.product ? subscription.product.name : null,
        productFamily: 'SME',
        productLine: subscription.product
          ? subscription.product.productLine
          : null,
        category: 'SME',
        timestamp: new Date().toISOString(),
        ...customProperties,
      }
    : {};
