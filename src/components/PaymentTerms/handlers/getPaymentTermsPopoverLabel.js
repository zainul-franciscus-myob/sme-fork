import formatSlashDate from '../../../common/valueFormatters/formatDate/formatSlashDate';
import getExpiredDate from './getExpiredDate';

const getPaymentTermsPopoverLabel = ({
  issueDate,
  expirationDays,
  expirationTerm,
  expirationTermOptions,
}) => {
  if (
    !issueDate ||
    expirationTerm === 'Prepaid' ||
    expirationTerm === 'CashOnDelivery'
  ) {
    const selected =
      expirationTermOptions.find((term) => term.value === expirationTerm) || {};

    return selected.name;
  }

  return formatSlashDate(
    getExpiredDate({
      issueDate,
      expirationDays,
      expirationTerm,
    })
  );
};

export default getPaymentTermsPopoverLabel;
