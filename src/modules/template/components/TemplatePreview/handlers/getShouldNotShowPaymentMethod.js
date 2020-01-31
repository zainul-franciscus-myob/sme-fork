const getShouldNotShowPaymentMethod = ({
  region,
  isOnlinePaymentLoading,
  isAllowOnlinePayment,
  bankDeposit,
  cheque,
}) => {
  if (region === 'au') {
    return !isOnlinePaymentLoading && !isAllowOnlinePayment && !bankDeposit && !cheque;
  }

  return !bankDeposit && !cheque;
};

export default getShouldNotShowPaymentMethod;
