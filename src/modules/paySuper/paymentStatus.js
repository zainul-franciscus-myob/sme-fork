const paymentStatus = {
  Created: {
    display: 'Pending authorisation',
    color: 'orange',
  },
  PartiallyAuthorised: {
    display: 'Partially Authorised',
    color: 'orange',
  },
  Authorised: {
    display: 'Authorised',
    color: 'light-grey',
  },
  RequestFunds: {
    display: 'Funds requested',
    color: 'light-grey',
  },
  FundsPaid: {
    display: 'Processing payment',
    color: 'light-grey',
  },
  FundsUnavailable: {
    display: 'Withdrawal failed',
    color: 'red',
  },
  FundsTransferError: {
    display: 'Payment failed',
    color: 'red',
  },
  Completed: {
    display: 'Completed',
    color: 'green',
  },
  PaymentDispersmentError: {
    display: 'Reversal required',
    color: 'red',
  },
  ReversalCompleted: {
    display: 'Reversal completed',
    color: 'green',
  },
};

export default paymentStatus;
