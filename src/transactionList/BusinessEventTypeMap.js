const BusinessEventTypeMap = {
  GeneralAccounting: 'generalJournal',
  CashPayment: 'spendMoney',
  CashReceipt: 'receiveMoney',
  TransferMoney: 'transferMoney',
  ReceivePayment: 'invoicePayment',
  PayBill: 'billPayment',
  ReceiveRefund: 'receiveRefund',
  SettlePurchaseReturn: 'appliedPurchaseReturn',
  PayRefund: 'payRefund',
  SettleSaleReturn: 'applyToSale',
  Purchase: 'bill',
  Sale: 'invoice',
  Payroll: 'employeePay',
};

export default BusinessEventTypeMap;
