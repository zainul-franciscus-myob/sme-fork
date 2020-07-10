const replaceNegativeAmountWithZero = (
  basePayItemIds, payItem,
) => (basePayItemIds.includes(payItem.payItemId)
&& parseFloat(payItem.amount) < 0
  ? '0.00' : payItem.amount);

const replaceNegativeHoursWithZero = (
  basePayItemIds, payItem,
) => (basePayItemIds.includes(payItem.payItemId)
&& parseFloat(payItem.hours) < 0
  ? '0.00' : payItem.hours);

const clearNegatives = (
  employeePaysLines,
  basePayItemIds,
) => employeePaysLines.map(line => ({
  ...line,
  payItems: line.payItems.map(payItem => ({
    ...payItem,
    amount: replaceNegativeAmountWithZero(basePayItemIds, payItem),
    hours: replaceNegativeHoursWithZero(basePayItemIds, payItem),
  })),
}));

export default clearNegatives;
