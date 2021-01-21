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
    case TransactionType.SPEND_MONEY:
      return `${baseUrl}/${recurringTransactionId}/spendMoney`;
    default:
      return baseUrl;
  }
};

export default getRecurringUrl;
