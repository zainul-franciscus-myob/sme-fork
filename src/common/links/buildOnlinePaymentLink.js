import getQueryFromParams from '../getQueryFromParams/getQueryFromParams';

const buildOnlinePaymentLink = ({
  url,
  businessId,
  serialNumber,
  isTrial,
  isRegistered,
  location,
}) => {
  const queryParams = getQueryFromParams({
    target: 'oip-settings',
    cdf: businessId,
    sn: serialNumber,
    source: 'SMEP',
    isTrial,
    medium: location,
    isMerchant: isRegistered,
  });

  return `${url}${queryParams}`;
};

export default buildOnlinePaymentLink;
