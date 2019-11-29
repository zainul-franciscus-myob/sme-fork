import formatAmount from './formatAmount';

const formatCurrency = (amount) => {
  const formattedAmount = formatAmount(Math.abs(amount));

  return amount < 0 ? `-$${formattedAmount}` : `$${formattedAmount}`;
};

export default formatCurrency;
