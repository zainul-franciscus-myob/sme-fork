export const businessEventTypes = {
  generalJournal: 'GeneralAccounting',
  spendMoney: 'CashPayment',
  receiveMoney: 'CashReceipt',
  transferMoney: 'TransferMoney',
  billPayment: 'PayBill',
  invoicePayment: 'ReceivePayment',
};

export const businessEventFeatures = {
  [businessEventTypes.generalJournal]: 'generalJournal',
  [businessEventTypes.spendMoney]: 'spendMoney',
  [businessEventTypes.receiveMoney]: 'receiveMoney',
  [businessEventTypes.transferMoney]: 'transferMoney',
};
