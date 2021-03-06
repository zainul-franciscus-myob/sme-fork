export const businessEventTypes = {
  generalJournal: 'GeneralAccounting',
  spendMoney: 'CashPayment',
  receiveMoney: 'CashReceipt',
  transferMoney: 'TransferMoney',
  supplierPayment: 'PayBill',
  // TODO Remove the comment code after monitoring Supplier payment flow
  // billPayment: 'PayBill',
  invoicePayment: 'ReceivePayment',
  receiveRefund: 'ReceiveRefund',
  settlePurchaseReturn: 'SettlePurchaseReturn',
  payRefund: 'PayRefund',
  settleSaleReturn: 'SettleSaleReturn',
  bill: 'Purchase',
  invoice: 'Sale',
  quote: 'Quote',
  employeePay: 'EmployeePayment',
  paySuper: 'PaySuperannuation',
  electronicPayment: 'ElectronicPayment',
};

export const businessEventToFeatureMap = {
  [businessEventTypes.generalJournal]: 'generalJournal',
  [businessEventTypes.spendMoney]: 'spendMoney',
  [businessEventTypes.receiveMoney]: 'receiveMoney',
  [businessEventTypes.transferMoney]: 'transferMoney',
  [businessEventTypes.supplierPayment]: 'supplierPayment',
  // TODO Remove the comment code after monitoring Supplier payment flow
  // [businessEventTypes.billPayment]: 'billPayment',
  [businessEventTypes.invoicePayment]: 'invoicePayment',
  [businessEventTypes.receiveRefund]: 'receiveRefund',
  [businessEventTypes.settlePurchaseReturn]: 'appliedPurchaseReturn',
  [businessEventTypes.payRefund]: 'payRefund',
  [businessEventTypes.settleSaleReturn]: 'applyToSale',
  [businessEventTypes.bill]: 'bill',
  [businessEventTypes.invoice]: 'invoice',
  [businessEventTypes.quote]: 'quote',
  [businessEventTypes.employeePay]: 'employeePay',
  [businessEventTypes.paySuper]: 'paySuper',
  [businessEventTypes.electronicPayment]: 'electronicPayments',
};
