// Copied in sme-web-bff (if this is changed please update the one in sme-web-bff)
const ApprovedStatusTypes = {
  // For transactions that have been allocated/matched to a single account
  singleAllocation: 'singleAllocation',
  // For transactions that have been allocated/matched to multiple accounts
  splitAllocation: 'splitAllocation',
  // For transactions that have been matched to multiple transactions
  splitMatched: 'splitMatched',
  // For transactions that have been matched to a transfer money
  transfer: 'transfer',
};

const UnapprovedStatusTypes = {
  // For transactions that haven't been allocated & don't have a matching transaction available
  unmatched: 'unmatched',
  // For transactions that haven't been allocated & have a matching transaction available
  matched: 'matched',
  // For transactions that haven't been allocated & have a matching invoice/bill available
  paymentRuleMatched: 'paymentRuleMatched',
};

export const isStatusUnapproved = (status) =>
  status === UnapprovedStatusTypes.matched ||
  status === UnapprovedStatusTypes.unmatched ||
  status === UnapprovedStatusTypes.paymentRuleMatched;

const BankTransactionStatusTypes = {
  ...UnapprovedStatusTypes,
  ...ApprovedStatusTypes,
};

export default BankTransactionStatusTypes;
