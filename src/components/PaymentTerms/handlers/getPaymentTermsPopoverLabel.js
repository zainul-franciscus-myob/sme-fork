import getExpiredDate from './getExpiredDate';

const getPaymentTermsPopoverLabel = ({
  issueDate,
  expirationDays,
  expirationTerm,
  expirationTermOptions,
}) => {
  const expiredDate = getExpiredDate({
    issueDate,
    expirationDays,
    expirationTerm,
  });

  return ['Prepaid', 'CashOnDelivery'].includes(expirationTerm)
    ? expirationTermOptions.find(term => term.value === expirationTerm).name
    : expiredDate;
};

export default getPaymentTermsPopoverLabel;
