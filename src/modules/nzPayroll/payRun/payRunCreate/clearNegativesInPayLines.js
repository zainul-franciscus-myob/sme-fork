const replaceNegativeAmountWithZero = (basePayItemIds, payLine) =>
  basePayItemIds.includes(payLine.payItemId) && parseFloat(payLine.amount) < 0
    ? '0.00'
    : payLine.amount;

const replaceNegativeQuantityWithZero = (basePayItemIds, payLine) =>
  basePayItemIds.includes(payLine.payItemId) && parseFloat(payLine.quantity) < 0
    ? '0.00'
    : payLine.quantity;

const clearNegatives = (employeePaysLines, basePayItemIds) =>
  employeePaysLines.map((line) => ({
    ...line,
    payLines: line.payLines.map((payLine) => ({
      ...payLine,
      amount: replaceNegativeAmountWithZero(basePayItemIds, payLine),
      quantity: replaceNegativeQuantityWithZero(basePayItemIds, payLine),
    })),
  }));

export default clearNegatives;
