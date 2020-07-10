const formatAmount = (amount) =>
  Intl.NumberFormat('en-AU', {
    style: 'decimal',
    minimumFractionDigits: '2',
    maximumFractionDigits: '2',
  }).format(amount);

export default formatAmount;
