const replaceNegativeAmountWithZero = (basePayItemIds, payItem) =>
  basePayItemIds.includes(payItem.payrollCategoryId) &&
  parseFloat(payItem.amount) < 0
    ? '0.00'
    : payItem.amount;

const replaceNegativeQuantityWithZero = (basePayItemIds, payItem) =>
  basePayItemIds.includes(payItem.payrollCategoryId) &&
  parseFloat(payItem.quantity) < 0
    ? '0.00'
    : payItem.quantity;

const clearNegatives = (employeePaysLines, basePayItemIds) =>
  employeePaysLines.map((line) => ({
    ...line,
    payItems: line.payItems.map((payItem) => ({
      ...payItem,
      amount: replaceNegativeAmountWithZero(basePayItemIds, payItem),
      quantity: replaceNegativeQuantityWithZero(basePayItemIds, payItem),
    })),
  }));

export default clearNegatives;
