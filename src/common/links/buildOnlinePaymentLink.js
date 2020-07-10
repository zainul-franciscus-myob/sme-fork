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
    cdf: businessId,
    sn: serialNumber,
    source: 'ARL',
    isTrial,
    medium: location,
    isMerchant: isRegistered,
  });

  return `${url}${queryParams}`;
};

export default buildOnlinePaymentLink;
