import TransactionType from '../types/TransactionType';

const getRecurringUrl = ({
  transactionType,
  businessId,
  region,
  recurringTransactionId,
}) => {
  const baseUrl = `/#/${region}/${businessId}/recurringTransaction`;

  switch (transactionType) {
    case TransactionType.INVOICE:
      return `${baseUrl}/${recurringTransactionId}/invoice`;
    default:
      return baseUrl;
  }
};

export default getRecurringUrl;
